import { createChannel } from "../../common/config/rabbitmq";
import { APP_CONFIGS } from "../../common/config";
import { addJobsToQueue } from "../../queue/queue";
import { logDetails } from "../../common/config/bullmq";
// consume published msg from broker

// consumes the projectid and prometheus url
export const consumeMsg =  async () => {
    const assertQueueOptions = {durable: true}
    console.log('sending message to queue')

    return createChannel()
    .then((channel) => {
        if (!channel) {
        throw new Error('failed to create a channel');
        }
       channel.assertQueue(APP_CONFIGS.QUEUE_NAME_RMQ_1, assertQueueOptions)
       channel.consume(APP_CONFIGS.QUEUE_NAME_RMQ_1, (msg) => {
        // send message to queue system
        if (!msg) {
            throw new Error('Consumer cancelled by server')
        }
        // adds jobs to queue
        addJobsToQueue(logDetails, APP_CONFIGS.JOB_NAME, msg.content.toString())
        channel.ack(msg)
       })
    }).catch((err) => {
        throw new Error(err)
    })
}


