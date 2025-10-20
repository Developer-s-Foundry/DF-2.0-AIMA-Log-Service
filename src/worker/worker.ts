import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { APP_CONFIGS } from '../common/config';

const connection = new IORedis({ maxRetriesPerRequest: null });

const worker = new Worker(
  APP_CONFIGS.QUEUE_NAME,
  async job => {
   // persist data into database
   // modify data to conform to recommedation system contract agreement
   // publish to broker
  },
  { connection },
);