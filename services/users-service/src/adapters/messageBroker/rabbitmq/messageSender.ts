import { connectRabbitMq, channel } from "./rabbitmqConnection";

export const sendDataThroughRabbitMq = async (queue: string, data: any) => {
  try {
    // first we will check the channel is open or not
    if (!channel) await connectRabbitMq();

    // asserting queue
    await channel.assertQueue(queue);

    // now we can send the data through rmq
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.log(
      `an error happened during sending message through the rabbit mq ${error}`
    );
  }
};
