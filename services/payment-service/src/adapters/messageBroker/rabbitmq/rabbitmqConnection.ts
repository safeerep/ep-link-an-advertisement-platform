import amqp, { Channel, Connection  } from 'amqplib'
import { PREMIUM_USER_QUEUE} from '../../../queues';
import { consumeDataFromQueue } from './commonMessageReceiver';
import dependencies from '../../../utils/config/dependencies';

let channel: Channel;
let connection: Connection;
const RABBIT_PORT = String(process.env.RABBIT_PORT);

const connectRabbitMq = async () => {
    try {
        connection = await amqp.connect(RABBIT_PORT)
        channel = await connection.createChannel()

        // asserting the payment service' common queue 
        // to get premium members details to store;
        await channel.assertQueue(`${PREMIUM_USER_QUEUE}`)
        consumeDataFromQueue(dependencies)
        console.log(`rabbit mq connected successfully with payment-service`)
    } catch (error) {
        console.log(`an error happened during connecting the message broket with payment-service ${error}`);
    }
}

export {
    connectRabbitMq,
    channel
};