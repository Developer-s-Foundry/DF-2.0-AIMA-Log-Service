import { Queue } from "bullmq"
import { APP_CONFIGS } from "../common/config";
import { redisConnection } from "../common/config/bullmq";


// set up a queue
// export const logDetails = new Queue(APP_CONFIGS.QUEUE_NAME, {connection: redisConnection});
// ptoject queue
export const projectQueue = new Queue(APP_CONFIGS.QUEUE_NAME, {connection: redisConnection});

export const addJobsToQueue = async (Queue_obj: Queue, jobname: string, msg: {}) => {
    if (!Queue_obj) {
        throw new Error('fail to initialise queue')
    }
   await Queue_obj.add(jobname, msg)
}