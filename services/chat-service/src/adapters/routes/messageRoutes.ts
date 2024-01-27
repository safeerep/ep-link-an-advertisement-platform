import { Router } from "express";
import verifyUserAuth from "../../utils/middlewares/verifyUserAuth";
import messageControllers from "../../handlers/contollers/messageControllers";

const messageRoutes = ( dependencies: any) => {
    const router = Router();
    const {
        saveMessageController
    } = messageControllers(dependencies);

    router.post('/save-message', verifyUserAuth, saveMessageController)
    return router;
}


export default messageRoutes;