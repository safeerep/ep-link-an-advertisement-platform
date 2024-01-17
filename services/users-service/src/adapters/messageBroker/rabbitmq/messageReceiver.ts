import { connectRabbitMq, channel } from "./rabbitmqConnection";

export const consumeDataFromQueue = async (queue: string) => {
  try {
    // as always first we have to check that the channel is open or not;
    if (!channel) await connectRabbitMq();

    // then, assertQueue
    await channel.assertQueue(queue);

    return new Promise((resolve) => {
      channel.consume(queue, (data) => {
        if (data) {
          const response = Buffer.from(data.content).toString();
          // acknowledging
          channel.ack(data);
          resolve(JSON.parse(response));
        }
      });
    });
  } catch (error) {
    console.log(`an error happened during consuming data from queue ${error}`);
    throw error;
  }
};
