import { premiumMemberControllers } from "../../../handlers/controllers";
import {  PREMIUM_USER_QUEUE } from "../../../queues";
import { connectRabbitMq, channel } from "./rabbitmqConnection";

export const consumeDataFromQueue = async (dependencies: any) => {
  const {
    saveMemberDetailsController
  } = premiumMemberControllers(dependencies);

  try {
    // as always first we have to check that the channel is open or not;
    if (!channel) await connectRabbitMq();

    // then, assertQueue
    await channel.assertQueue(`${PREMIUM_USER_QUEUE}`);
    channel.consume(`${PREMIUM_USER_QUEUE}`, (data) => {
      if (data) {
        const response = Buffer.from(data.content).toString();
        // acknowledging
        channel.ack(data);
        const userDetails = JSON.parse(response);

        console.log("from payment service receiver");
        console.log(userDetails);
        // in this common message receiver we will get the details about new members who are taking premium membership
        // so, we have to save it here;
        saveMemberDetailsController(userDetails);
      }
    });
  } catch (error) {
    console.log(`an error happened during consuming data from queue ${error}`);
    throw error;
  }
};