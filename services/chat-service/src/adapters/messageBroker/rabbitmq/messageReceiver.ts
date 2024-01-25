import { connectRabbitMq, channel } from "./rabbitmqConnection";

export const consumeDataFromQueue = ( queue: string):Promise<void> => {
    return new Promise( async ( resolve, reject) => {
        try {
            // first we have to check is channel existing or not
            if (!channel) {
                await connectRabbitMq()
            }
            // asserting queue
            channel.assertQueue(queue)
            channel.consume(queue, (data) => {
                if (!data) {
                    reject()
                } else {
                    const response = Buffer.from(data.content).toString()
                    // then we can acknowledge that, we got data
                    channel.ack(data)
                    // resolving with data;
                    resolve(JSON.parse(response))
                }
            })
        } catch (error) {
            console.log(`an error happened during consuming data from queue ${queue}`);
            reject(error)
        }
    })
}