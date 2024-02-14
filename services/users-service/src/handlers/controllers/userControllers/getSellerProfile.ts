import { Request, Response } from "express";
import { IUserData } from "../../../adapters/database/mongo";
import { consumeDataFromQueue } from "../../../adapters/messageBroker/rabbitmq/messageReceiver";
import { sendDataThroughRabbitMq } from "../../../adapters/messageBroker/rabbitmq/messageSender";
import { PRODUCT_QUEUE, REPLY_QUEUE } from "../../../queues";
import { v4 as uuidv4 } from 'uuid'

export default ( dependencies: any) => {
    const {
        usecases: {
            findUserWithId_usecase
        }
    } = dependencies;

    const getSellerProfile = async ( req: Request, res: Response) => {
        const sellerId: string = req.params.sellerId;
        let seller: IUserData;
        try {
            // first we will take the user details without the products added by the user
            seller = await findUserWithId_usecase(dependencies).interactor(sellerId)
            if (!seller) {
                // it means seller id is invalid
                return res.json({ success: false, message: 'seller id is invalid' })
            }
            // else we will continue in the next try catch block
        } catch (error) {
            console.log(`an error happened during fetching the seller details ${error}`);
            return res.json({ success: false, message: 'something went wrong' })
        }

        try {
            // now we have to get seller added products from the seller service
            // we will retrieve the products through message broker
            const uniqueId: string = uuidv4();
            sendDataThroughRabbitMq(PRODUCT_QUEUE, { sellerId, uniqueId})
            .then( async () => {
                console.log(`message sent through product queue successfully`);
                
                await consumeDataFromQueue(`${REPLY_QUEUE}-${uniqueId}`)
                .then((products: any) => {
                    if (products) {
                        console.log(`current seller' products are`, products);
                        return res.json({ success: true, seller, ...products, message: "successfully fetched seller' products"})
                    }
                })
                .catch((err: any) => {
                    console.log(`something went wrong during retrieving data from reply queue ${err}`);
                    return res.json({ success: true, message: "product service may be unavailable", seller})
                })
            })
            .catch((error: any) => {
                console.log(`something went wrong during sending data through product queue ${error}`);
                return res.json({ success: true, seller, message: "can't send data through message broker right now "})
            })
        } catch (error) {
            console.log(`something went wrong during retrieving seller's product through rabbit mq ${error}`);
            return res.json({ success: false, message: 'something went wrong'})
        }
    }

    return getSellerProfile;
}