import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";
import { sendDataThroughRabbitMq } from "../../../adapters/messageBroker/rabbitmq/messageSender";
import { REPLY_QUEUE, USER_DATA_QUEUE } from "../../../queues";
import { v4 as uuidV4 } from 'uuid'
import { consumeDataFromQueue } from "../../../adapters/messageBroker/rabbitmq/messageReceiver";

export default (dependencies: any) => {
    const {
        usecases: {
            chatRoomUsecases: {
                findIsChatRoomExistingWithTwoSpecificUsers_usecase,
                createANewChatroom_usecase
            },
            messageUsecases: {
                getMessagesFromOneChatroom_usecase
            }
        }
    } = dependencies;

    const getChatroom = async (req: Request, res: Response) => {
        console.log('--------------------');

        console.log(dependencies);


        // we are setting variable with default value false;
        let chatRoomExisting: boolean = false;
        // we will get seller id in params;
        const sellerId = req.params?.sellerId;

        try {
            if (!sellerId) return res.json({ success: false, message: "there is no seller id in params" })
            // we have to get current user id;
            const token: string = req.cookies.userJwt;
            console.log(token);

            getUserId(token)
                .then(async (userId) => {
                    const currentUserId = String(userId)
                    // first we have to check that, is there have a chatroom with the seller and current user;
                    const existingChatRoom = await
                        findIsChatRoomExistingWithTwoSpecificUsers_usecase(dependencies).interactor(currentUserId, sellerId)
                    // if there have one chatroom with this user we don't have to create new one, 
                    // but we have to fetch the data from that chatroom;
                    if (existingChatRoom) {
                        chatRoomExisting = true;
                        const messages = await
                            getMessagesFromOneChatroom_usecase(dependencies).interactor(existingChatRoom?._id)

                        const uniqueId: string = uuidV4();
                        // sending seller id for to get seller data;
                        sendDataThroughRabbitMq(USER_DATA_QUEUE, {
                            sellerId,
                            uniqueId
                        }).then(() => {
                            console.log(`seller id sent successfully through rabbit mq`);
                            // then, consuming the user data from user queue;
                            consumeDataFromQueue(`${REPLY_QUEUE}-${uniqueId}`)
                                .then((sellerDetails) => {
                                    console.log(`got response from users service`);
                                    console.log(sellerDetails);
                                    return res.json({ success: true, seller: sellerDetails, messages, message: 'successfully fetched data from already existing chatroom' })
                                })
                                .catch((err: any) => {
                                    console.log(`something went wrong during consuming data from user queue ${err}`);
                                    return res.json({ success: true, message: 'fetched chatroom details and messages, but seller details are not available right now' })
                                })
                        })
                            .catch((err: any) => {
                                console.log(`something went wrong during sending data to user queue ${err}`);
                                return res.json({ success: true, message: 'chat room is existing, but seller details are not available right now' })
                            })
                    }
                }).catch((err: any) => {
                    console.log('ok');

                    console.log(`something went wrong during destructuring token for getting current user id ${err}`);
                    throw new Error('something went wrong during destructuring token for getting current user id')
                })
        } catch (error) {
            console.log(`something went wrong during fetching the chatroom details ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong" })
        }

        try {
            // if there is no chat room is existing? we will create;
            if (!chatRoomExisting) {
                const token: string = req.cookies.userJwt;
                getUserId(token)
                    .then(async (userId) => {
                        const currentUserId = String(userId)
                        const usersId = {
                            users: [currentUserId, sellerId]
                        }
                        const newChatroom = await
                            createANewChatroom_usecase(dependencies).interactor(usersId)
                        if (!newChatroom) {
                            return res.json({ success: false, message: 'something went wrong' })
                        }
                        else {
                            // now we created a new room for chat then wa have to give seller data to client service;
                            const uniqueId: string = uuidV4();
                            // sending seller id for to get seller data;
                            sendDataThroughRabbitMq(USER_DATA_QUEUE, {
                                sellerId,
                                uniqueId
                            }).then(() => {
                                console.log(`seller id sent successfully through rabbit mq`);
                                // then, consuming the user data from user queue;
                                consumeDataFromQueue(`${REPLY_QUEUE}-${uniqueId}`)
                                    .then((sellerDetails) => {
                                        console.log(`got response from users service`);
                                        console.log(sellerDetails);
                                        return res.json({ success: true, seller: sellerDetails, message: 'successfully created new chatroom' })
                                    })
                                    .catch((err: any) => {
                                        console.log(`something went wrong during consuming data from user queue ${err}`);
                                        throw new Error('created chat room, but seller details are not available right now')
                                    })
                            }).catch((err: any) => {
                                console.log(`something went wrong during sending data to user queue ${err}`);
                            })
                        }
                    })
                    .catch((err) => {
                        console.log(`something went wrong during destructuring token for getting current user id ${err}`);
                        // throw new Error('something went wrong during destructuring token for getting current user id')
                        return res.json({ success: true, message: err })
                    })
            }
        } catch (error) {
            console.log(`something went wrong during creating new chatroom ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong' })
        }
    }

    return getChatroom;
}