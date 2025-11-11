import { Worker } from 'bullmq';
import { APP_CONFIGS } from '../common/config';
import { LogService } from '../service/log_service';
import { publishMsg } from '../broker/producers/producer';
import { redisConnection } from "../common/config/bullmq";
import { parseData } from '../common/utils/helper_func';


  
const logService = new LogService();


export const workerSystem = async () => {
  console.log('queue processing started');

  const worker = new Worker(
  APP_CONFIGS.QUEUE_NAME,
    async job => {
      console.log('i worked ', job.data)
      if(!job.data) {
        throw new Error('job not found')
      } 
      const metricData = {...job.data};

      //convert timestamp to date object
      if (metricData.time_stamp && metricData.value) {
          metricData.time_stamp = Number(metricData.time_stamp);
          metricData.value = Number(metricData.value);
          console.log(metricData.time_stamp, metricData.value)
      }

      console.log(metricData)
    // persist data into db
    if (!(parseData(metricData))){
        throw new Error('metric data not found');
    }

    
    const logData = logService.createLog(metricData);
    console.log('persisted in database');

    // publish to broker
    publishMsg(JSON.stringify(logData))
    console.log('published succesfully')
  },
  { connection: redisConnection },
);

  worker.on('completed', (job) => console.log(`Job ${job.id} completed`));
  worker.on('failed', (job, err) => console.error(`Job ${job?.id} failed:`, err));

}
