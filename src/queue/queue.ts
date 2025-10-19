import { Queue } from "bullmq"

export const addJobsToQueue = async (Queue_obj: Queue, jobname: string, msg: {}) => {
    if (!Queue_obj) {
        throw new Error('fail to initialise queue')
    }
    Queue_obj.add(jobname, msg)
}