import * as amqp from 'amqplib';
import { APP_CONFIGS } from '.';

let connection: amqp.ChannelModel | null = null;

// return connection
export const getRabbitConnection = () => {
  if (connection) {
    console.log('connection already exist');
    return Promise.resolve(connection);
  };

 return amqp.connect(APP_CONFIGS.RABBITMQ_URL as string)
 .then((conn) => {
    connection = conn
    return connection;
  })
};

export const createChannel = () => {
    return getRabbitConnection()
    .then((conn) => {
        if (!conn) {
            throw new Error('failed to connect to rabbitmq')
        }
        conn.on('close', () => {
          console.log('connection closed, retrying....')
          setTimeout(() => {
            createChannel();
          }, 5000); 
        })
        return conn.createChannel();
    }).catch((error) => {
        console.log(error.message);
         setTimeout(() => {
            createChannel();
          }, 5000); 
    })
}