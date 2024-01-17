import { connectRabbitMq, channel } from "./rabbitmqConnection";

export const consumeDataFromQueue =async ( queue: string) :Promise<any> => {
    try {
        // first we have to ensure that the channel is open
        if (!channel) await connectRabbitMq();

        // asserting queue
        await channel.assertQueue(queue)

        // then, now we can consume the data from specified queue
        return new Promise((resolve) => {
            channel.consume(queue, (data) => {
                if (data) {
                    const response = Buffer.from(data.content).toString();
                    // acknowledging
                    channel.ack(data)
                    resolve(JSON.parse(response))
                }
            })
        })
        
    } catch (error) {
        console.log(`an error happened during consuming data from queue ${error}`);
        throw error
    }
}