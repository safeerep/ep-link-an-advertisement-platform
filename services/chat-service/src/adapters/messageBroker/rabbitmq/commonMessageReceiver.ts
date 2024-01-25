import { connectRabbitMq, channel } from "./rabbitmqConnection";

export const commonMessageReceiver = async () => {
    try {
        if (!channel) {
            await connectRabbitMq()
        }
        channel.assertQueue(`common queue`)
    } catch (error) {
        console.log(`some wrong things happened during consuming data from the common queue of chat-service`);
    }
} 