import { sendDataThroughRabbitMq } from "../../../adapters/messageBroker/rabbitmq/messageSender";
import { REPLY_QUEUE } from "../../../queues";

export default ( dependencies: any) => {
    const {
        usecases: {
            productUsecases
        }
    } = dependencies;

    const getSpecificSellerProduct = async ( objectWithSellerIdAndUniqueId: any) => {
        try {
            const {
                sellerId,
                uniqueId
            } = objectWithSellerIdAndUniqueId;
            // after getting user id, we can fetch the products simply
            const products = await productUsecases.getCurrentUserProducts_usecase(dependencies).interactor(sellerId)
            if (products) {
                sendDataThroughRabbitMq(`${REPLY_QUEUE}-${uniqueId}`, products)
            }
            else {
                console.log(`something went wrong during sending data as response through rabbit`);
                throw new Error('something went wrong')
            }
        } catch (error) {
            console.log(`something went wrong during fetching a specific seller's products ${error}`);
        }
    }

    return getSpecificSellerProduct;
}