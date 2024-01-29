import { Request, Response } from "express";
import { IProduct } from "../../../entities/productEntities";
import { ObjectId } from "mongoose";
import getUserId from "../../../utils/externalServices/jwt/getUserId";
import { sendDataThroughRabbitMq } from "../../../adapters/messageBroker/rabbitmq/messageSender";
import { v4 as uuidv4 } from 'uuid'
import { consumeDataFromQueue } from "../../../adapters/messageBroker/rabbitmq/messageReceiver";
import { REPLY_QUEUE, USER_DATA_QUEUE } from "../../../queues";

export default (dependencies: any) => {
    const {
        usecases: {
            productUsecases
        }
    } = dependencies;

    const getOneSpecificProduct = async ( req: Request, res: Response ) => {
        let currentProduct: IProduct;
        try {
            // at first we will get product id in params
            const productId: string = req.params.productId;            
            // if there is no product id, we can return 
            if (!productId) return res.json({ success: false, message: 'product id is not given in params' })

            // if there have product id, we have to continue
            const product = await productUsecases
            .getOneSpecificProduct_usecase(dependencies).interactor(productId)
            console.log(product);
            
            // if we can't find product, that means product id is invalid
            if (!product) return res.json({ success: false, message: "invalid product id"})

            currentProduct = product;
        } catch (error) {
            console.log(`something went wrong during fetching a specific product' details ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong" })
        }

        try {
            
            // now we have to check user is followed the seller or not
            // for to know that, first we have to get the curernt user' id 
            // and then seller data
            const token : string = req.cookies.userJwt;
            const sellerId: ObjectId = currentProduct.userId;
            // for fetching current user id
            getUserId(token)
            .then((currentUserId: any) => {
                console.log(`seller id`, String(sellerId));
                console.log(`current user id`, String(currentUserId));
                // now we have to check that, is the currentuser and seller is same or not;
                if (String(currentUserId) == String(sellerId)) {
                    console.log('ok same');
                    return res.json({ success: true, status: "same_user", currentProduct ,message: 'successfully fetched a specific product data'})
                }
                else {
                    // we have to get the data of seller
                    // we will also send a unique id with it to get the response queue name with that;
                    const uniqueId: string = uuidv4();
                    sendDataThroughRabbitMq( USER_DATA_QUEUE , {sellerId, uniqueId})
                    .then( async () => {
                        console.log('sent successfully');                    
                        await consumeDataFromQueue(`${REPLY_QUEUE}-${uniqueId}`)
                        .then((data: any) => {
                            if (data) {
                                // data will be the document of seller
                                const following = data.followers.filter((userId: any) => {
                                    return userId === currentUserId;
                                })
                                // that means user is following the seller
                                if (following.length){
                                    return res.json({ success: true, status: "following", currentProduct, seller: data, message: "successfully fetched current product data" })
                                }
                                else {
                                    return res.json({ success: true, status: "not-following", currentProduct, seller: data, message: "successfully fetched current product data" })
                                }
                            }
                        })
                        .catch((error) => {
                            console.log(`an error happened during fetching data with rabbit mq ${error}`);
                            return res.json({ success: true, status: false, message: "can't get user", currentProduct})
                        })
                    })
                    // when sending message through rabbit mq is failing
                    .catch((error: any) => {
                        console.log(`an error happened during sending data through rabbit mq, error is: ${error}`);
                        return res.json({ success: true, status: false, message: "can't get user details right now", currentProduct })
                    })
                }
            })
            .catch((err: any) => {

            })
        } catch (error) {
            console.log(`an error happened during checking the seller details ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong' })
        }
    }

    return getOneSpecificProduct;
}