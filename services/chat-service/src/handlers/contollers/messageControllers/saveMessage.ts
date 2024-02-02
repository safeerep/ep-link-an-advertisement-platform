import { Request, Response } from "express";

export default (dependencies: any) => {
    const {
        usecases: {
            messageUsecases,
            chatRoomUsecases,
            userUsecases
        }
    } = dependencies;

    const saveNewMessage = async (req: Request, res: Response) => {
        // we will get roomId, message, senderId as req.body;
        try {
            // first we have to check is receiver is active to listen the current user or blocked the current user
            // for that we have to get current user id and receiver Id;
            // current userId will be the sender Id ;
            // with the chatRoomId and current userId, we have to find receiver Id
            const { chatRoomId, senderId } = req.body;
            const users = await chatRoomUsecases
                .getUsersIdFromChatroom_usecase(dependencies).interactor(chatRoomId)

            // then we have to check the receiver blocked or not 

            try {
                const receiverId = users.filter((userId: string) => String(userId) !== senderId)
                const isBlocked = await userUsecases
                    .checkIsReceiverBlockedSender_usecase(dependencies).interactor(String(receiverId), senderId)

                if (isBlocked) {
                    return res.json({ success: true, message: "current user is not able to send message to this receiver" })
                }
                // else we will store message in the next try catch block;
                else {
                    const chatRoomDocument = await chatRoomUsecases
                        .checkUserOnlineStatusInARoom_usecase(dependencies).interactor(chatRoomId, String(receiverId))

                    if (chatRoomDocument) {
                        const receiver = chatRoomDocument.users?.find((user: any) => String(user.userId) === String(receiverId));
                        if (receiver?.onlineStatus) {
                            // its the condition that the receiver is currently online and active in this room;
                            req.body.unRead = false;
                        }
                    
                    }
                }
            } catch (error) {
                console.log(`something went wrong during checking receiver is blocked sender or not`);
                return res.status(503).json({ success: false, message: "something went wrong" })
            }

        } catch (error) {
            console.log(`something went wrong during taking uses ids from a chatroom ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong" })
        }

        try {
            // here we will save new message
            const newMessage = await messageUsecases
                .saveNewMessage_usecase(dependencies).interactor(req.body)
            if (newMessage) {
                return res.json({ success: true, message: 'successfully saved new message' })
            }
            throw new Error('something went wrong')
        } catch (error) {
            console.log(`something went wrong during saving message`);
            return res.status(503).json({ success: false, message: "something went wrong" })
        }
    }

    return saveNewMessage;
}