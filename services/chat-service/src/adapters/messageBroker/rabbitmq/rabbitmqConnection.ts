import amqp, { Channel, Connection } from 'amqplib'

let connection: Connection;
let channel: Channel;

const connectRabbitMq = async () => {
    try {
        connection = await amqp.connect("amqp://localhost:5672")
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