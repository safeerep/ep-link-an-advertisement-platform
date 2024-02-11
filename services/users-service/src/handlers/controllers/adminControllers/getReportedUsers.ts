import { Request, Response } from "express";
import verifyToken from "../../../utils/externalServices/jwt/tokenChecker";

export default ( dependencies: any) => {

    const {
        adminUsecases: {
            getReportedUsers_usecase
        }
    } = dependencies;
    const getReportedUsers = async (req: Request, res: Response) => {

        try {
            // to give reported users list after successful auth check;
            // we will get current page in query;
            const page = req.query.page;

            const reportedUsers = await getReportedUsers_usecase(dependencies).interactor(page);
            return res.json({ success: true, currentPage: page, ...reportedUsers, message: "successfully fetched all the reported users"})
        } catch (error) {
            console.log(`something went wrong during fetching reported users ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong'})
        }
    }
    return getReportedUsers;
}