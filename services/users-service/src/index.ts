import start from "./start";
import dbConnection from "./config/dbConnection";
import envChecker from "./utils/checkers/envChecker";
import { connectRabbitMq } from "./adapters/messageBroker/rabbitmq/rabbitmqConnection";
import startCronJob from "./adapters/database/mongo/cronService/checkPremiumPlanValidity";

( async () => {
    try {
        start;
        dbConnection();
        startCronJob();
        await envChecker();
        await connectRabbitMq();
    } catch (error) {
        console.log(`something went wrong`, error);
    }
})()