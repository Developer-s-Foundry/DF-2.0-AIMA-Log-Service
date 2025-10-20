import { Queue } from "bullmq";
import { APP_CONFIGS } from ".";

export const logQueue = new Queue(APP_CONFIGS.QUEUE_NAME, {connection: {
    host: APP_CONFIGS.REDIS_HOST , 
    port: parseInt(APP_CONFIGS.REDIS_PORT), 
    password: APP_CONFIGS.REDIS_PASSWORD,
    username: APP_CONFIGS.REDIS_USERNAME,
    tls: {rejectUnauthorized: false}
}});