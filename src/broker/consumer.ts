import { createChannel } from "../common/config/rabbitmq";
import { APP_CONFIGS } from "../common/config";
import { addJobsToQueue } from "../queue/queue";
import { logQueue } from "../common/config/bullmq";
// consume published msg from broker


export const consumeMsg =  () => {
    const assertQueueOptions = {durable: true}

    return createChannel()
    .then((channel) => {
       channel.assertQueue(APP_CONFIGS.JOB_NAME, assertQueueOptions)
       channel.consume(APP_CONFIGS.JOB_NAME, (msg) => {
        // send message to queue
        if (!msg) {
            throw new Error('Consumer cancelled by server')
        }
        addJobsToQueue(logQueue, APP_CONFIGS.JOB_NAME, msg)
        channel.ack(msg)
       })
    }).catch((err) => {
        throw new Error(err)
    })
}


