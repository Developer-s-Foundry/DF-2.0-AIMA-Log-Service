import { Redis } from 'ioredis';
import { Queue } from "bullmq";
import { APP_CONFIGS } from ".";

const redisConnection = new Redis({
    maxRetriesPerRequest: null,
    host: APP_CONFIGS.REDIS_HOST , 
    port: parseInt(APP_CONFIGS.REDIS_PORT), 
    password: APP_CONFIGS.REDIS_PASSWORD,
    username: APP_CONFIGS.REDIS_USERNAME,
    tls: {}
});

export const logQueue = new Queue(APP_CONFIGS.QUEUE_NAME, {connection: redisConnection});