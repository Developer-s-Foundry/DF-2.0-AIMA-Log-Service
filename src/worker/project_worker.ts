import { Worker } from "bullmq";
import { redisConnection } from "../common/config/bullmq";
import { APP_CONFIGS } from "../common/config";
import { getFullMetricsData, getTimeStampSeries} from "../common/utils/helper_func";
import { MetricRepo } from "../repositories/metrics_repo";



export async function projectWorker() {

    const metricRepo = new MetricRepo()

    const worker = new Worker(APP_CONFIGS.QUEUE_NAME, async (job) => {
        const prometheus_metric_url = job.data.prometheus_metric_url;
        console.log(prometheus_metric_url);
        // get the list of metrics names
        const metricsMetadata = await getFullMetricsData(prometheus_metric_url);
        console.log(metricsMetadata);
        const allRecommendation = {}
        // loop through data
        metricsMetadata.forEach(async (metricValue, index) => {
            let metricData = {
                    type: '',
                    metric_name: '',
                    time_stamp: new Date(),
                    metric: {},
                    value: 0,
                    project_id: 0
            }
            const allSeries = `https://${prometheus_metric_url}/api/v1/query?query=${metricValue}`;
            
            metricData.metric_name = Object.keys(metricValue)[0];
            const [type] = Object.values(metricValue)[0];
            metricData.type = type;
            const unformattedData =  await getTimeStampSeries(allSeries);
            metricData.metric = unformattedData[0].metric;
            metricData.value = unformattedData[0].value[1];
            metricData.time_stamp = unformattedData[0].value[0] && new Date(unformattedData[0].value[0])
            metricData.project_id = Number(job.data.id)
            // create metric and save to database
            metricRepo.createLog(metricData);
             // based on type, give a recommendation
             switch (type) {
                case 'counter':
                    const counterDataFormat = {
                         [`total_${metricData.metric_name} in 5m`]: sum(increase(http_requests_total[10m]))

                    }
                    
                    
                    break;

                 case 'gauge':
                    
                    break;

                case 'histogram':
                
                break;
             
                default:
                    break;
             }
            
        })
       
        // save each recommendation in an array
        // publish to broker when loop ends

    }, {connection: redisConnection})

    worker.on('completed', (job) => console.log(`Job ${job.id} completed`));
    worker.on('failed', (job, err) => console.error(`Job ${job?.id} failed:`, err))


}