import { createChannel } from "../common/config/rabbitmq";
import { APP_CONFIGS } from "../common/config";
// consume published msg from broker

export const consumeMsg = () => {
    const assertQueueOptions = {durable: true}

    return createChannel()
    .then((channel) => {
       channel.assertQueue(APP_CONFIGS.QUEUE_NAME, assertQueueOptions)
       channel.consume(APP_CONFIGS.QUEUE_NAME, (msg) => {
        // send message to queue
        if (!msg) {
            throw new Error('Consumer cancelled by server')
        }
        
       })
    }).then((chan) => {
    })
}


