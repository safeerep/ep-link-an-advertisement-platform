import { Request, Response } from "express";
import verifyToken from "../../../utils/externalServices/jwt/tokenChecker";

export default ( dependencies: any) => {

    const {
        adminUsecases: {
            getAllUsers_usecase
        }
    } = dependencies;
    const getAllUsers = async (req: Request, res: Response) => {
        // to give users list after successful auth check;
        // we will get the current page in query;
        const page = req.query.page;
        try {
            const users = await getAllUsers_usecase(dependencies).interactor(page);
            return res.json({ success: true, currentPage: page, ...users, message: "request for fetching all users is successful"})
        } catch (error) {
            console.log(`something went wrong ${error}`);
            return res.json({ success: false, message: 'something went wrong'})
        }
    }
    return getAllUsers;
}