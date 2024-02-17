import amqp, { Channel, Connection } from 'amqplib'

let connection: Connection;
let channel: Channel;

const RABBIT_PORT = String(process.env.RABBIT_PORT);
const connectRabbitMq = async () => {
    try {
        connection = await amqp.connect(RABBIT_PORT)
        channel = await connection.createChannel()
        console.log(`successfully connected with message broker in chat service`);
    } catch (error) {
        console.log(`an error occured during connecting with rabbit mq ${error}`);
        
    }
}

export {
    connectRabbitMq,
    channel
}