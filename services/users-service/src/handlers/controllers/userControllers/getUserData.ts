import { sendDataThroughRabbitMq } from "../../../adapters/messageBroker/rabbitmq/messageSender";
import { REPLY_QUEUE } from "../../../queues";

export default ( dependencies: any) => {
    const {
        usecases: {
            findUserWithId_usecase
        }
    } = dependencies;

    const getUserDataToSendToQueue = async ( obj: any) => {
        try {
            const {
                sellerId, 
                uniqueId
            } = obj;
            const seller = await findUserWithId_usecase(dependencies).interactor(sellerId);
            if (seller) {
                // here we are responding through a unique que created;
                sendDataThroughRabbitMq(`${REPLY_QUEUE}-${uniqueId}`, seller)
            }
            else {
                console.log(`something went wrong safeer, check it`);
            }
        } catch (error) {
            console.log(`an error happened during fetching data for send to queue`);
        }
    }

    return getUserDataToSendToQueue;
}