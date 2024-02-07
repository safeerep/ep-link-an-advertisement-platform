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
            const reportedUsers = await getReportedUsers_usecase(dependencies).interactor();
            return res.json({ success: true, message: "successfully fetched all the reported users", reportedUsers})
        } catch (error) {
            console.log(`something went wrong during fetching reported users ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong'})
        }
    }
    return getReportedUsers;
}