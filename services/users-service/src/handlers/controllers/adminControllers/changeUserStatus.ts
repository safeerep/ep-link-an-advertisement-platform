import { Response } from "express";
import verifyToken from "../../../utils/externalServices/jwt/tokenChecker";

export = (dependencies: any) => {
    const {
        adminUsecases: {
            changeUserStatus_usecase
        }
    } = dependencies;
    const changeUserStatus = async (req: any, res: Response) => {
        // first we have to check is admin is authenticated or not
        try {
            const token = req.cookies.adminJwt;
            if (!token) return res.json({ success: false, message: "admin is not authenticated"})
            const isValidToken = await verifyToken(token)
            if (!isValidToken) return res.json({ success: false, message: "token is not valid"})
        } catch (error) {
            console.log(`an error happened, ${error}`);
            return res.json({ success: false, message: 'something went wrong'})
        }

        // then, we can change this specific user' status
        try {
            // to send back the users after the changes are made
            const userId = req.body._id;
            if (!userId) return res.json({ success: false, message: 'data is not enough' })
            const users = await changeUserStatus_usecase(dependencies).execute(userId)
            if (!users) return res.json({ success: false, message: "something went wrong"})
            return res.json({ success: true, message: "successfully updated user status", users })
        } catch (error) {
            console.log(`something went wrong ${error}`);
            return res.json({ success: false, message: 'something went wrong'})
        }
    }
    return changeUserStatus;
}