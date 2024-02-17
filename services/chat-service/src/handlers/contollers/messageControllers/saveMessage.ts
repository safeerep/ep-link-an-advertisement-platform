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
            // here we will save new message
            const newMessage = await messageUsecases
                .saveNewMessage_usecase(dependencies).interactor(req.body)
            if (newMessage) {
                // now we have to update chatroom document with latest message;
                const { chatRoomId, message, typeOfMessage } = req.body;
                let latestMessage: string = ''
                if (typeOfMessage === 'text') {
                    latestMessage = message
                } else {
                    latestMessage = typeOfMessage;
                }
                const updatedLatestMessage = await chatRoomUsecases
                .updateLatestMessage_usecase(dependencies).interactor( chatRoomId, latestMessage)
                if (updatedLatestMessage) {
                    return res.json({ success: true, message: 'successfully saved new message' })
                }
                else {
                    console.log('something went wrong during updating latest message');
                    return res.status(503).json({ success: false, message: "something went wrong" })
                }
            }
            throw new Error('something went wrong')
        } catch (error) {
            console.log(`something went wrong during saving message`);
            return res.status(503).json({ success: false, message: "something went wrong" })
        }
    }

    return saveNewMessage;
}