import { Router } from "express";
import chatRoomControllers from "../../handlers/contollers/chatRoomControllers";
import verifyUserAuth from "../../utils/middlewares/verifyUserAuth";

const chatRoomRoutes = (dependencies: any) => {
    const router = Router()
    const {
        getChatroomController,
        getCurrentUserChatRoomsController
    } = chatRoomControllers(dependencies)

    router.get(`/get-chat-room/with/:sellerId`, verifyUserAuth, getChatroomController)
    router.get(`/get-current-user-chats`, verifyUserAuth, getCurrentUserChatRoomsController)

    return router;
}

export default chatRoomRoutes;