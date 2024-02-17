import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";
import { ChatRoomDocument } from "../../../adapters/database/mongo/schemas";

export default ( dependencies: any) => {
    const {
        usecases: {
            messageUsecases: {
                getCountOfUnreadMessages_usecase
            },
            chatRoomUsecases: {
                getAllChatsOfCurrentUser_usecase
            },
        }
    } = dependencies;

    const getCountOfAllUnreadMessages = async ( req: Request, res: Response) => {

        try {
            // first we have to get userId
            const token: string = req.cookies.userJwt;
            const userId = await getUserId(token)
            const currentUserId = String(userId);

            // after getting userId we can move with userId to fetch the total unread messages;
            // before that, we have to get the all the rooms id of the user to fetch messages count from there;
            const allChatRoomsThatUserIncluded = await getAllChatsOfCurrentUser_usecase(dependencies).interactor(currentUserId);
            const chatRoomIdsArray = allChatRoomsThatUserIncluded.map((chatRoomDoc: ChatRoomDocument) => {
                return chatRoomDoc?._id;
            });

            const totalCountOfUnreadMessages = await 
            getCountOfUnreadMessages_usecase(dependencies).interactor(currentUserId, chatRoomIdsArray);

            return res.json({ success: true, totalCountOfUnreadMessages, message: "successfully fetched total unread messages of the user"});
        } catch (error) {
            console.log(`something went wrong during checking the all unread messages count ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong"})
        }
    }

    return getCountOfAllUnreadMessages;
}