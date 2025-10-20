import * as amqp from 'amqplib';
import { APP_CONFIGS } from '.';

let connection: amqp.ChannelModel | null = null;

export const getRabbitConnection = () => {
  if (connection) return Promise.resolve(connection);

  return amqp.connect(APP_CONFIGS.RABBITMQ_URL as string)
  .then((conn) => {
    connection = conn
    return conn;
  }).catch((error) => {
    throw new Error('failed to connect to Rabbit-Server' + error)
  });
};

export const createChannel = () => {
    return getRabbitConnection()
    .then((conn) => {
        if (!conn) {
            throw new Error('failed to connect to rabbitmq')
        }
        return conn.createChannel()
    }).then((channel) => {
        return channel
    }).catch((error) => {
        throw new Error('failed to create a channel' + error) 
    })
   
}