import { connectRabbitMq, channel } from "./rabbitmqConnection";

export const sendDataThroughRabbitMq = ( queue: string, data: any):Promise<void> => {
    return new Promise( async ( reslove, reject) => {
        try {
            if (!channel) {
                await connectRabbitMq()
            }
            // asserting queue
            await channel.assertQueue(queue)
            // sending data through specified queue
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)))
            // resolve promise
            reslove()
        } catch (error) {
            console.log(`an error happened during sending data through rabbit mq ${error}`);
            reject(error)
        }
    })
}