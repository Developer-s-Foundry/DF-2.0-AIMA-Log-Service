import { Queue } from "bullmq";
import { APP_CONFIGS } from ".";

export const logQueue = new Queue(APP_CONFIGS.QUEUE_NAME);