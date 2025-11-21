import { Worker } from 'bullmq';
import { APP_CONFIGS } from '../common/config';
import { LogService } from '../service/log_service';
import { publishMsg } from '../broker/producers/producer';
import { redisConnection } from "../common/config/bullmq";
import { extractData, processData } from '../common/utils/helper_func';


  
const logService = new LogService();


export const workerSystem = async () => {
  console.log('queue processing started');

  const worker = new Worker(
  APP_CONFIGS.QUEUE_NAME as string,
    async job => {
      const jobData = job.data;
      console.log('i worked ', jobData)
      console.log(typeof(jobData))
      if(!jobData) {
        throw new Error('job not found')
      }
      const timezoned_Timestamp = new Date(jobData.timestamp);
      console.log(timezoned_Timestamp)

      const metricsData = {
        source: jobData.source,
        event_id: jobData.eventId,
        version: jobData.version,
        time_stamp: timezoned_Timestamp,
      };

      // data cleansing
      const modifiedData = processData(jobData.metrics);
      // console.log(modifiedData);

      for (let i = 0; i < modifiedData.length; i++) {
        const extractedData = extractData(modifiedData[i]);
        const {metricName, metricType, label} = extractedData;

        await logService.createLog({...metricsData, 
          metric_name: metricName, 
          metric_type: metricType,
          labels: label
        });

        console.log('persisted in database');

        // publish to broker
        publishMsg(JSON.stringify({...metricsData, 
          metric_name: metricName, 
          metric_type: metricType,
          labels: label
        }))
        console.log('published succesfully')
      }
    
  },
  { connection: redisConnection },
);

  worker.on('completed', (job) => console.log(`Job ${job.id} completed`));
  worker.on('failed', (job, err) => console.error(`Job ${job?.id} failed:`, err));

}
