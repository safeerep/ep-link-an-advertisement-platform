import { Router } from "express";
import userControllers from "../../handlers/contollers/userControllers";
import verifyUserAuth from "../../utils/middlewares/verifyUserAuth";

const userRoutes = ( dependencies: any) => {
    const router = Router()
    const {
        checkIsReceiverBlockedController,
        blockUserController,
        unBlockUserController
    } = userControllers(dependencies)

    router.patch('/user/block/:sellerId', verifyUserAuth, blockUserController)
    router.patch('/user/un-block/:sellerId', verifyUserAuth, unBlockUserController)

    return router;
}

export default userRoutes;