
import { APP_CONFIGS } from "../../common/config";
import { createChannel } from "../../common/config/rabbitmq";



export const publishMsg = (msg: string) => {
    createChannel()
    .then((channel) => {
        if (!channel) {
        throw new Error('failed to create a channel')
        }
        setInterval(() => channel.sendToQueue(
            APP_CONFIGS.QUEUE_NAME_RMQ_2, Buffer.from(msg)), 1000)
            console.log(`Sent to ${APP_CONFIGS.QUEUE_NAME_RMQ_2}:`, msg);
    }).catch(error => {
        throw new Error('failed to publish message' + error)
    })
}