import { Request, Response } from "express";

export default (dependencies: any) => {
    const {
        usecases: {
            messageUsecases
        }
    } = dependencies;

    const updateMessageStatusAsRead = async ( req: Request, res: Response) => {
        try {
            // here we will get userId and roomId in req.body;
            const  { roomId, userId } = req.body;
            const messageStatusUpdated = await messageUsecases
            .changeMessageStatusAsRead_usecase(dependencies).interactor( userId, roomId)

            if (messageStatusUpdated) {
                return res.json({ success: true, message: "successfully updated message status as read"})
            }
        } catch (error) {
            console.log(`something went wrong during updating message status as read ${error}`);
            return res.json({ success: false, message: "something went wrong during updating message status as read"})
        }

    }

    return updateMessageStatusAsRead;
}