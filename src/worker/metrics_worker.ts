import { createChannel } from "../common/config/rabbitmq";
import { APP_CONFIGS } from "../common/config";
import { LogError } from "../common/types/error_types";



// const metricData = {
//     metric_name: 'cpu-usage',
//     project_id: '123',
//     time_stamp: '',
//     value: '22200',
//     result_type: 'vector',
//     app: 'prometheus',
//     instance: 'localhost',
//     job: 'prometheus',
// }
const metricData = {
    eventId: 'event_1763120287310_r6v7zosl2',
    source: "Elijah's Service",
    timestamp: '2025-11-14T11:38:07.310Z',
    version: '1.0',
    metrics: '# HELP python_gc_objects_collected_total Objects collected during gc\n# TYPE python_gc_objects_collected_total counter\npython_gc_objects_collected_total{generation="0"} 5484.0\npython_gc_objects_collected_total{generation="1"} 2994.0\npython_gc_objects_collected_total{generation="2"} 38.0\n# HELP python_gc_objects_uncollectable_total Uncollectable objects found during GC\n# TYPE python_gc_objects_uncollectable_total counter\npython_gc_objects_uncollectable_total{generation="0"} 0.0\npython_gc_objects_uncollectable_total{generation="1"} 0.0\npython_gc_objects_uncollectable_total{generation="2"} 0.0\n# HELP python_gc_collections_total Number of times this generation was collected\n# TYPE python_gc_collections_total counter\npython_gc_collections_total{generation="0"} 162.0\npython_gc_collections_total{generation="1"} 14.0\npython_gc_collections_total{generation="2"} 1.0\n# HELP python_info Python platform information\n# TYPE python_info gauge\npython_info{implementation="CPython",major="3",minor="8",patchlevel="10",version="3.8.10"} 1.0\n# HELP aima_http_requests_total Total HTTP requests\n# TYPE aima_http_requests_total counter\n# HELP aima_http_request_duration_seconds HTTP request latency (seconds)\n# TYPE aima_http_request_duration_seconds histogram\n# HELP aima_recommendations_generated_total Total recommendations generated\n# TYPE aima_recommendations_generated_total counter\n'}

// fetch metrics from prometeus api
const getMetricsNames = (serverUrl: string): Promise<string[]> => {
    // get the list of available metrics in prometheus
    // let  metricsList: Array<string>;
    const endPoint: string = `http://${serverUrl}/api/v1/label/__name__/values`

    return fetch(endPoint)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json()
        })
        .then((data) => {
            console.log(data);
            return (data.data)

        })
};

// get the metrics according to metric name on the list item
// publish to rabbitMq

const processItem = (metricName: string, hostName: string) => {
    console.log(`processing item ${metricName}`)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(`http://${hostName}/api/v1/query?query=${metricName}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    resolve(res.json())
                }).catch((error) => reject('unable to fetch metric data ' + error))
        }, 2000);
    })
}

// export const PubMetrics = () => {

// Recursive promise-based scheduler (no async/await)
// (async function scheduleMetricsFetch() {
//     console.log('worker just started')
//      const hostName = APP_CONFIGS.RMQ_HOST_NAME;
//      const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;
//     getMetricsNames(hostName)
//         .then((metricNameList) => {
//             return Promise.all(metricNameList.map((value) => processItem(value, hostName)));
//          })
//          .then((metricsList) => {
//             // publish to message broker
//             createChannel()
//             .then((channel) => {
//                 if (!channel) {
//                     throw new Error('failed to create a channel')
//                 }
//                 channel.assertQueue(APP_CONFIGS.QUEUE_NAME_RMQ);
//                 for (const el of metricsList) {
//                     console.log('worker is in progress')
//                     setTimeout(() => {
//                         channel.sendToQueue(APP_CONFIGS.QUEUE_NAME_RMQ, 
//                         Buffer.from(JSON.stringify(el)));  
//                     }, 2000);
//                 }
//             })
//         }).catch((err) => {
//             console.error(err);
//         })
//         .finally(() => {
//         // Wait two days, then re-run
//         new Promise((resolve) => setTimeout(resolve, TWO_DAYS))
//             .then(() => scheduleMetricsFetch())
//         });
// })();


// data format for testing 


(async () => {
    // send mock data to metrics_data_queue
    console.log(metricData)
    createChannel()
        .then((channel) => {
            if (!channel) {
                throw new LogError('unable to create channel', 400);
            }
            channel.assertExchange(APP_CONFIGS.PROM_EXCHANGE_NAME, 'fanout',
                { durable: false }).then(() => {
                    console.log('exchange established successfully');
                }).catch(error => {
                    console.log(error.message)
                });
            channel.publish(APP_CONFIGS.PROM_EXCHANGE_NAME, '', 
                Buffer.from(JSON.stringify(metricData)))
        }).then(() => {
            console.log('channel successfully created')
        }).catch(error => {
            console.log(error.message);
        })
}
)()