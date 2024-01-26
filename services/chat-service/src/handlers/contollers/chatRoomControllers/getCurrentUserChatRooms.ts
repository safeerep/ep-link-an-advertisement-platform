import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export default ( dependencies: any) => {
    const {
        usecases: {
            chatRoomUsecases: {
                getAllChatsOfCurrentUser_usecase
            }
        }
    } = dependencies;

    const getAllChatsOfCurrentUser = async ( req: Request, res: Response) => {
        try {
            // first we have to get current user's id to fetch all chats
            const token: string = req.cookies.userJwt;
            getUserId(token)
            .then(async (userId: any) => {
                const currentUserId: string = String(userId)
                const chats = await getAllChatsOfCurrentUser_usecase(dependencies).interactor(currentUserId)

                return res.json({ success: true, chats, message: "successfully fetched all chats of currentuser" })
            })
            .catch((err) => {
                console.log(` an error happened during destructuring current user token to get id ${err}`);
                return res.status(503).json({ success: false, message: "something went wrong"})
            })
        } catch (error) {
            console.log(`an error happened during fetching all chats of current user ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong"})
        }
    }

    return getAllChatsOfCurrentUser;
}