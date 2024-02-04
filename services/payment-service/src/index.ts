import start from './start';
import envChecker from './utils/checkers/envChecker';
import dbConnection from './config/dbConnection';
import { connectRabbitMq } from './adapters/messageBroker/rabbitmq/rabbitmqConnection';

( async () => {
    try {
        start;
        await envChecker();
        await dbConnection();
        await connectRabbitMq();
    } catch (error) {
        console.log(`an error happened during starting the chat service ${error}`);
    }
})()