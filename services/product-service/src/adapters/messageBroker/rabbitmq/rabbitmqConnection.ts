import amqp, { Channel, Connection  } from 'amqplib'

let channel: Channel;
let connection: Connection;


const connectRabbitMq = async () => {
    try {
        connection = await amqp.connect("amqp://localhost:5672")
        channel = await connection.createChannel()

        // creating the product service' common queue 
        await channel.assertQueue('product-queue')
        console.log(`rabbit mq connected successfully with product-service`)
    } catch (error) {
        console.log(`an error happened during connecting the queue ${error}`);
    }
}

export {
    connectRabbitMq,
    channel
};