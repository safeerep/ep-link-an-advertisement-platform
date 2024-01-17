import { Request, Response } from "express";
import verifyToken from "../../../utils/externalServices/jwt/tokenChecker";

export = ( dependencies: any) => {

    const {
        adminUsecases: {
            getAllUsers_usecase
        }
    } = dependencies;
    const getAllUsers = async (req: Request, res: Response) => {

        // first we have to check the auth of admin;
        try {
            const token = req.cookies.adminJwt;
            if (!token) return res.json({ success: false, message: "admin is not authenticated"})
            const isValidToken = await verifyToken(token)
            if (!isValidToken) return res.json({ success: false, message: "token is not valid"})
        } catch (error) {
            console.log(`an error happened, ${error}`);
            return res.json({ success: false, message: 'something went wrong'})
        }

        // to give users list after successful auth check;
        try {
            const users = await getAllUsers_usecase(dependencies).execute();
            return res.json({ success: true, message: "request is successful", users})
        } catch (error) {
            console.log(`something went wrong ${error}`);
            return res.json({ success: false, message: 'something went wrong'})
        }
    }
    return getAllUsers;
}