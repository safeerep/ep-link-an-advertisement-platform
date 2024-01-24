import amqp, { Channel, Connection  } from 'amqplib'
import { PRODUCT_QUEUE } from '../../../queues';
import { consumeDataFromQueue } from './commonMessageReceiver';
import dependencies from '../../../utils/config/dependencies';

let channel: Channel;
let connection: Connection;


const connectRabbitMq = async () => {
    try {
        connection = await amqp.connect("amqp://localhost:5672")
        channel = await connection.createChannel()

        // creating the product service' common queue 
        await channel.assertQueue(`${PRODUCT_QUEUE}`)
        consumeDataFromQueue(dependencies)
        console.log(`rabbit mq connected successfully with product-service`)
    } catch (error) {
        console.log(`an error happened during connecting the queue ${error}`);
    }
}

export {
    connectRabbitMq,
    channel
};