import amqp, { Channel, Connection } from 'amqplib'
import { consumeDataFromQueue } from './commonMessageReceiver';
import dependencies = require('../../../utils/config/dependencies');
import { USER_DATA_QUEUE } from '../../../queues';

let channel: Channel;
let connection: Connection;
const RABBIT_PORT = String(process.env.RABBIT_PORT);

const connectRabbitMq = async ( ) => {
    try {
        connection = await amqp.connect(RABBIT_PORT);
        channel = await connection.createChannel()
        await channel.assertQueue(`${USER_DATA_QUEUE}`);
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