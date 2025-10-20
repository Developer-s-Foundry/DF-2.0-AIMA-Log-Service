import { APP_CONFIGS } from "../common/config";
import { createChannel } from "../common/config/rabbitmq";



export const publishData = (data: string) => {
    createChannel()
    .then((channel) => {
        setInterval(() => channel.sendToQueue(
            APP_CONFIGS.QUEUE_NAME_RMQ, Buffer.from(data)), 1000)
        console.log('message publishe successfully')
    }).catch(error => {
        throw new Error('failed to publish message' + error)
    })
}