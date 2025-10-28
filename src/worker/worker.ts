
import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { APP_CONFIGS } from '../common/config';
import { LogService } from '../service/log_service';
import { publishMsg } from '../broker/producers/producer';

const connection = new IORedis(
  {maxRetriesPerRequest: null, 
    host: APP_CONFIGS.REDIS_HOST , 
    username: APP_CONFIGS.REDIS_USERNAME,
    port: parseInt(APP_CONFIGS.REDIS_PORT), 
    password: APP_CONFIGS.REDIS_PASSWORD,
    tls: {}
  });

  
const logService = new LogService()


export const workerSystem = async () => {
  console.log('queue processing started');

  const worker = new Worker(
  APP_CONFIGS.QUEUE_NAME,
    async job => {

      //convert timestamp to date object
      if (job.data.timestamp && job.data.value) {
          job.data.timestamp = new Date(job.data.timestamp);
          job.data.value = parseInt(job.data.value);
      }
    // persist data into db
    const logData = logService.createLog(job.data)

    // publish to broker
    publishMsg(JSON.stringify(logData))
  },
  { connection },
);

  worker.on('completed', (job) => console.log(`Job ${job.id} completed`));
  worker.on('failed', (job, err) => console.error(`Job ${job?.id} failed:`, err));

}
