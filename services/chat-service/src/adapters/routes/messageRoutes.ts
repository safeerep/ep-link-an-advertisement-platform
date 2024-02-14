import { Router } from "express";
import verifyUserAuth from "../../utils/middlewares/verifyUserAuth";
import messageControllers from "../../handlers/contollers/messageControllers";
import upload from "../../utils/externalServices/aws-s3/fileUpload";

const messageRoutes = ( dependencies: any) => {
    const router = Router();
    const {
        saveMessageController,
        saveMediafilesController,
        changeMessagesStatusAsReadController
    } = messageControllers(dependencies);

    router.use(verifyUserAuth)
    router.post('/save-message', saveMessageController)
    router.post('/save-media-files', upload.array("files"), saveMediafilesController)
    router.patch('/change-message-status', changeMessagesStatusAsReadController)
    
    return router;
}


export default messageRoutes;