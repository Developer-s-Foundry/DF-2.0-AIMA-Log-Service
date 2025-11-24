import { APP_CONFIGS } from "../../common/config";
import { createChannel } from "../../common/config/rabbitmq";



export const publishMsg = (msg: string) => {
    const exchangeName = 'logData';
    const routingKey = 'logs'
    const queue2 = 'logData2'

    console.log(`publish: ${msg} to producer`)

    createChannel()
    .then((channel) => {
        if (!channel) {
        throw new Error('failed to create a channel')
        }
        channel.assertExchange(exchangeName, 'direct', {durable: true})
        .then(() => {
            console.log('exchange asserted successfully');

            // create a permanent queue
            channel.assertQueue(APP_CONFIGS.QUEUE_NAME_RMQ_2, {durable: true})
            .then(() => {
                console.log('queue asserted successfully');
            }).catch(((error: any) => {
                console.log(`unable to create a Queue${error}`);
            }));
            channel.assertQueue(queue2, {durable: true})
            channel.bindQueue(APP_CONFIGS.QUEUE_NAME_RMQ_2, exchangeName,routingKey);
            
            channel.bindQueue(queue2, exchangeName,routingKey)
            .then(() => {
                console.log(`bind to queue successfully`);
                channel.publish(
                exchangeName, routingKey, Buffer.from(msg))
            }).catch(((error: any) => {
                console.log(`unable to bind to a Queue${error}`);
            }));  
        }).catch((error: any) => {
            console.log(`unable to create exchange ${error}`);
        })      
    }).catch(error => {
        throw new Error('failed to publish message' + error)
    })
}