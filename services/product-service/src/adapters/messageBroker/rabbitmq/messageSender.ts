import { connectRabbitMq, channel } from "./rabbitmqConnection";

export const sendDataThroughRabbitMq = (queue: string, data: any) :Promise<void> => {
  return new Promise( async ( resolve, reject) => {
    try {
      // first we have to check that, channel is open or not
      if (!channel) await connectRabbitMq();
  
      // then we can create queues asper our needs
      // assertqueue will create the queue if there is no queue with specified name
      await channel.assertQueue(queue);
  
      // then we can send the data we want to send through the specified queue
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));

      resolve()
  
    } catch (error) {
      console.log(
        `an error happened during sending message through rabbit mq ${error}`
      );
      reject(error)
    }
  })
};
