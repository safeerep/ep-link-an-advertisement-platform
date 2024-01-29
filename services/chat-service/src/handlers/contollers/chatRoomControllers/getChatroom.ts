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
            },
            userUsecases: {
                updateUser_usecase,
                getUserData_usecase
            }
        }
    } = dependencies;

    const getChatroom = async (req: Request, res: Response) => {

        // we are setting variable with default value false;
        let chatRoomExisting: boolean = false;
        // we will get seller id in params;
        const sellerId = req.params?.sellerId;

        try {
            const token: string = req.cookies.userJwt;
            const userId = await getUserId(token);

            const currentUserId = String(userId);
            const uniqueId: string = uuidV4();

            await sendDataThroughRabbitMq(USER_DATA_QUEUE, { sellerId: currentUserId, uniqueId });
            console.log(`current user id sent successfully through rabbit mq`);

            // consuming the user data from user queue;
            const currentUserDetails: any = await consumeDataFromQueue(`${REPLY_QUEUE}-${uniqueId}`);

            if (currentUserDetails) {
                const currentUserDetailsUpdated = await updateUser_usecase(dependencies).interactor(currentUserId, currentUserDetails);
                console.log(currentUserDetailsUpdated);
            }
        } catch (error) {
            console.log(`something went wrong: ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong" });
        }



        // we have to know current user is blocked the receiver or not
        let currentUserBlockedReceiver: boolean = false;
        try {
            const token: string = req.cookies.userJwt;
            getUserId(token)
                .then(async (userId) => {
                    const currentUserId = String(userId)
                    const currentUser = await getUserData_usecase(dependencies).interactor(currentUserId)

                    if (currentUser?.blockedPersons?.includes(sellerId)) {
                        currentUserBlockedReceiver = true;
                    }
                })
                .catch((error: any) => {
                    console.log(`something went wrong during destructuring token to get current user data ${error}`);
                })
        } catch (error) {
            console.log(`something went wrong during fetching current user data ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong" })
        }

        try {
            if (!sellerId) return res.json({ success: false, message: "there is no seller id in params" });

            const token: string = req.cookies.userJwt;
            console.log(token);

            const userId = await getUserId(token);
            const currentUserId = String(userId);

            try {
                const existingChatRoom = await findIsChatRoomExistingWithTwoSpecificUsers_usecase(dependencies).interactor(currentUserId, sellerId);

                if (existingChatRoom) {
                    chatRoomExisting = true;
                    const messages = await getMessagesFromOneChatroom_usecase(dependencies).interactor(existingChatRoom?._id);
                    const uniqueId: string = uuidV4();

                    // sending data through rabbit mq to get seller details
                    await sendDataThroughRabbitMq(USER_DATA_QUEUE, { sellerId, uniqueId });

                    try {
                        const sellerDetails: any = await consumeDataFromQueue(`${REPLY_QUEUE}-${uniqueId}`);
                        console.log(`got response from users service`);
                        console.log(sellerDetails);

                        // now we can save seller data as userdata in the user collection of this service
                        if (sellerDetails) {
                            const sellerDataUpdated = await updateUser_usecase(dependencies).interactor(sellerId, sellerDetails)
                        }

                        return res.json({
                            success: true,
                            chatroom: existingChatRoom,
                            seller: sellerDetails,
                            currentUserBlockedReceiver,
                            messages,
                            message: 'successfully fetched data from already existing chatroom'
                        });
                    } catch (err) {
                        console.log(`something went wrong during consuming data from user queue ${err}`);
                        return res.json({
                            success: true,
                            messages,
                            currentUserBlockedReceiver,
                            chatroom: existingChatRoom,
                            message: 'fetched chatroom details and messages, but seller details are not available right now'
                        });
                    }
                }
            } catch (error) {
                console.log(`something went wrong during chatroom operations ${error}`);
                return res.status(503).json({ success: false, message: 'something went wrong during chatroom operations' });
            }
        } catch (error) {
            console.log(`something went wrong during fetching the chatroom details ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong' });
        }


        try {
            // if there is no chat room is existing? we will create;
            if (!chatRoomExisting) {
                const token: string = req.cookies.userJwt;
                getUserId(token)
                    .then(async (userId) => {
                        const currentUserId = String(userId)
                        const usersId = {
                            users: [
                                {
                                    userId: currentUserId,
                                    onlineStatus: true,
                                }
                                ,
                                {
                                    userId: sellerId,
                                    onlineStatus: false,
                                }

                            ]
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
                                console.log('seller id sent successfully through rabbit mq');
                                // then, consuming the user data from user queue;
                                consumeDataFromQueue(`${REPLY_QUEUE}-${uniqueId}`)
                                    .then(async (sellerDetails: any) => {
                                        console.log('got response from users service');
                                        console.log(sellerDetails);
                                        // now we are updating seller data into this service' users collection;
                                        if (sellerDetails) {
                                            const sellerDataUpdated = await updateUser_usecase(dependencies).interactor(sellerId, sellerDetails)
                                        }

                                        return res.json(
                                            {
                                                success: true,
                                                chatroom: newChatroom,
                                                seller: sellerDetails,
                                                currentUserBlockedReceiver,
                                                messages: [],
                                                message: 'successfully created new chatroom'
                                            })
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
                        return res.json({ success: false, message: err })
                    })
            }
        } catch (error) {
            console.log(`something went wrong during creating new chatroom ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong' })
        }
    }

    return getChatroom;
}