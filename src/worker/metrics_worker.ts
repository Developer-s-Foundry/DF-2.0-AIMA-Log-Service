import { createChannel } from "../common/config/rabbitmq";
import { APP_CONFIGS } from "../common/config";


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
        return(data.data)
        
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
(async function scheduleMetricsFetch() {
    console.log('worker just started')
     const hostName = APP_CONFIGS.RMQ_HOST_NAME;
     const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;
    getMetricsNames(hostName)
        .then((metricNameList) => {
            return Promise.all(metricNameList.map((value) => processItem(value, hostName)));
         })
         .then((metricsList) => {
            // publish to message broker
            createChannel()
            .then((channel) => {
                if (!channel) {
                    throw new Error('failed to create a channel')
                }
                channel.assertQueue(APP_CONFIGS.QUEUE_NAME_RMQ);
                for (const el of metricsList) {
                    console.log('worker is in progress')
                    setTimeout(() => {
                        channel.sendToQueue(APP_CONFIGS.QUEUE_NAME_RMQ, 
                        Buffer.from(JSON.stringify(el)));  
                    }, 2000);   
                }
            })
        }).catch((err) => {
            console.error(err);
        })
        .finally(() => {
        // Wait two days, then re-run
        new Promise((resolve) => setTimeout(resolve, TWO_DAYS))
            .then(() => scheduleMetricsFetch())
        });
})();