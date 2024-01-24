import productControllers from "../../../handlers/controllers/productControllers";
import { PRODUCT_QUEUE } from "../../../queues";
import { connectRabbitMq, channel } from "./rabbitmqConnection";

export const consumeDataFromQueue = async (dependencies: any) => {
  const {
    getSpecificSellerProductsController
  } = productControllers(dependencies);

  try {
    // as always first we have to check that the channel is open or not;
    if (!channel) await connectRabbitMq();

    // then, assertQueue
    await channel.assertQueue(`${PRODUCT_QUEUE}`);
    channel.consume(`${PRODUCT_QUEUE}`, (data) => {
      if (data) {
        const response = Buffer.from(data.content).toString();
        // acknowledging
        channel.ack(data);
        const userIdAndUniqueMessageId = JSON.parse(response);

        console.log("from product service receiver");
        console.log(userIdAndUniqueMessageId);
        // in this common message receiver we will get requests for to give the user data
        getSpecificSellerProductsController(userIdAndUniqueMessageId);
      }
    });
  } catch (error) {
    console.log(`an error happened during consuming data from queue ${error}`);
    throw error;
  }
};