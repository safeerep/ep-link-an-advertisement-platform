import { userControllers } from "../../../handlers/controllers";
import { connectRabbitMq, channel } from "./rabbitmqConnection";

export const consumeDataFromQueue = async (dependencies: any) => {
  const {
    getUserDataController
  } = userControllers(dependencies);

  try {
    // as always first we have to check that the channel is open or not;
    if (!channel) await connectRabbitMq();

    // then, assertQueue
    await channel.assertQueue("user-queue");
    channel.consume("user-queue", (data) => {
      if (data) {
        const response = Buffer.from(data.content).toString();
        // acknowledging
        channel.ack(data);
        const userIdAndUniqueMessageId = JSON.parse(response);

        console.log("from user service receiver");
        console.log(userIdAndUniqueMessageId);
        // in this common message receiver we will get requests for to give the user data
        getUserDataController(userIdAndUniqueMessageId);
      }
    });
  } catch (error) {
    console.log(`an error happened during consuming data from queue ${error}`);
    throw error;
  }
};
