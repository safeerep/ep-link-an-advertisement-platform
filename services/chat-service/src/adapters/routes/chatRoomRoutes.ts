import { Router } from "express";
import chatRoomControllers from "../../handlers/contollers/chatRoomControllers";
import verifyUserAuth from "../../utils/middlewares/verifyUserAuth";

const chatRoomRoutes = (dependencies: any) => {
    const router = Router()
    const {
        getChatroomController
    } = chatRoomControllers(dependencies)

    router.get(`/get-chat-room/with/:sellerId`, verifyUserAuth, getChatroomController)

    return router;
}

export default chatRoomRoutes;