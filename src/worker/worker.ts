
import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { APP_CONFIGS } from '../common/config';
import { LogService } from '../service/log_service';
import { publishMsg } from '../broker/producer';

const connection = new IORedis({ maxRetriesPerRequest: null });
const logService = new LogService()


export const workerSystem = async () => {
  console.log('worker started')
  const worker = new Worker(
  APP_CONFIGS.QUEUE_NAME,
  async job => {

    //convert timestamp to date object
    if (job.data.timestamp) {
        job.data.timestamp = new Date(job.data.timestamp)
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
