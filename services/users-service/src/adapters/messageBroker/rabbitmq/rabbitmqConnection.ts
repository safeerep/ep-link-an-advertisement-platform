import amqp, { Channel, Connection } from 'amqplib'
import { consumeDataFromQueue } from './commonMessageReceiver';
import dependencies = require('../../../utils/config/dependencies');

let channel: Channel;
let connection: Connection;

const connectRabbitMq = async ( ) => {
    try {
        connection = await amqp.connect("amqp://localhost:5672");
        channel = await connection.createChannel()
        await channel.assertQueue("user-queue");
        consumeDataFromQueue(dependencies);
        console.log(`successfully connected with rabbit mq in user-service`);
        
    } catch (error) {
        console.log(`an error happened during connecting with rabbit mq ${error}`);
    }
}

export {
    connectRabbitMq,
    channel
}