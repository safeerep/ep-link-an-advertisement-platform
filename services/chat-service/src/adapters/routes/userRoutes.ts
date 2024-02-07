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

    router.patch('/block/:sellerId', verifyUserAuth, blockUserController)
    router.patch('/un-block/:sellerId', verifyUserAuth, unBlockUserController)

    return router;
}

export default userRoutes;