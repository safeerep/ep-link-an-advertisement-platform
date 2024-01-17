import start from './start'
import dbConnection from './config/dbConnection';
import envChecker from './utils/checkers/envChecker';
import { connectRabbitMq } from './adapters/messageBroker/rabbitmq/rabbitmqConnection';

( async () => {
    try {
        start;
        dbConnection();
        await envChecker();
        await connectRabbitMq();
    } catch (error) {
        console.log(error);
    }
})()