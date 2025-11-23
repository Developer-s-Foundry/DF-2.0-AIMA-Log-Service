import { Worker } from "bullmq";
import { redisConnection } from "../common/config/bullmq";
import { APP_CONFIGS } from "../common/config";
import { fetchRecommendation, getFullMetricsData, getTimeStampSeries} from "../common/utils/helper_func";
import { MetricRepo } from "../repositories/metrics_repo";
import { publishMsg } from "../broker/producers/producer";



export async function projectWorker() {

    const metricRepo = new MetricRepo()

    const worker = new Worker(APP_CONFIGS.QUEUE_NAME, async (job) => {
        const prometheus_metric_url = job.data.prometheus_metric_url;
        const prometheusServerUrl = `https://${prometheus_metric_url}/api/v1/query?query=`
        console.log(prometheus_metric_url);
        // get the list of metrics names
        const metricsMetadata = await getFullMetricsData(prometheus_metric_url);
        console.log(metricsMetadata);
        const allRecommendation : any = {}
        // loop through data
        // save each recommendation in an array
        metricsMetadata.forEach(async (metricValue, index) => {
            let metricData = {
                    type: '',
                    metric_name: '',
                    time_stamp: new Date(),
                    metric: {},
                    value: 0,
                    project_id: 0
            }
            const allSeries = `${prometheusServerUrl}${metricValue}`;
            
            metricData.metric_name = Object.keys(metricValue)[0];
            const [type] = Object.values(metricValue)[0];
            metricData.type = type;
            const unformattedData =  await getTimeStampSeries(allSeries);
            metricData.metric = unformattedData[0].metric;
            metricData.value = unformattedData[0].value[1];
            metricData.time_stamp = unformattedData[0].value[0] && new Date(unformattedData[0].value[0])
            metricData.project_id = Number(job.data.id);
            // create metric and save to database
            metricRepo.createLog(metricData);
            console.log('persisted to database')
             // based on type, give a recommendation
             switch (type) {
                case 'counter':
                    const counterDataFormat = {
                         [`total_${metricData.metric_name} in 5m`]: fetchRecommendation(`${prometheusServerUrl}sum(increase(${metricData.metric_name}[5m]))`), 

                         [`request_rate_${metricData.metric_name} in 5m`]: fetchRecommendation(`${prometheusServerUrl}sum(rate(${metricData.metric_name}[5m]))`)
                    } 
                    allRecommendation['counter'] = {count: counterDataFormat  }           
                    break;

                 case 'gauge':
                    const gaugeDataFormat = {
                         [`value over the_last_5_minutes_${metricData.metric_name} in 5m`]: fetchRecommendation(`${prometheusServerUrl}avg_over_time(${metricData.metric_name}[5m]))`),

                        [`value over the_last_5_minutes_${metricData.metric_name} in 5m`]: fetchRecommendation(`${prometheusServerUrl}max_over_time(${metricData.metric_name}[5m]))`)
                    } 
                    allRecommendation['gauge'] = {gauge: gaugeDataFormat}
                    break;

                case 'histogram':
                const histogramDataFormat = {
                         [`95th percentile latency_${metricData.metric_name}_bucket in 5m`]: fetchRecommendation(`${prometheusServerUrl}histogram_quantile(0.95, sum(rate(${metricData.metric_name}_bucket[5m])) by (le))`)
                    } 
                    allRecommendation['histogram'] = {histogram: histogramDataFormat}
                break;
             
                default:
                    allRecommendation['metrics_type'] = {metric_type: 'not found'}
                    break;
             }
            
        })
    
        // publish to broker when loop ends
        publishMsg(JSON.stringify(allRecommendation));

    }, {connection: redisConnection})

    worker.on('completed', (job) => console.log(`Job ${job.id} completed`));
    worker.on('failed', (job, err) => console.error(`Job ${job?.id} failed:`, err))


}