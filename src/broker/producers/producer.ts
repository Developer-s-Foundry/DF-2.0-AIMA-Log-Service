import { APP_CONFIGS } from "../../common/config";
import { createChannel } from "../../common/config/rabbitmq";



export const publishMsg = (msg: string) => {
    const exchangeName = 'logData';
    const routingKey = 'logs'

    createChannel()
    .then((channel) => {
        if (!channel) {
        throw new Error('failed to create a channel')
        }
        channel.assertExchange(exchangeName, 'direct', {durable: true});
        
        setInterval(() => channel.publish(
            exchangeName, routingKey, Buffer.from(msg)), 1000)
            console.log(`Sent to ${exchangeName}:`, msg);    
    }).catch(error => {
        throw new Error('failed to publish message' + error)
    })
}