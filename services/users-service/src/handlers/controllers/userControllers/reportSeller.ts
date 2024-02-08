import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";
import mongoose from "mongoose";

export default ( dependencies: any) => {
    const {
        usecases: {
            findUserWithId_usecase,
            reportSeller_usecase
        }
    } = dependencies;

    const reportSeller = async ( req: Request, res: Response) => {
        const { sellerId, reason } = req.body;
        if (!sellerId || !reason) {
            return res.json({ success: false, message: "request is not having enough data"})
        }

        try {
            const seller = await findUserWithId_usecase(dependencies).interactor(sellerId)
            if (!seller) {
                return res.json({ success: false, message: 'seller is not existing'})
            }
            // else we will continue in the next block
        } catch (error) {
            console.log(`something went wrong during checking the seller id is valid or not to report ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong"})
        }

        try {
            // we have to find, who is reported(current user)
            const token: string = req.cookies.userJwt;
            getUserId(token)
            .then( async (userId: any) => {
                const currentUserId = String(userId)
                // now we can pass the data to report seller
                const reportObj = {
                    reportedBy: new mongoose.Types.ObjectId(currentUserId),
                    reason: reason
                }
                const reported = await reportSeller_usecase(dependencies).interactor( sellerId, reportObj)
                if (reported) {
                    return res.json({ success: true, message: 'successfully reported on a user account'})
                }
                return res.status(503).json({ success: false, message: "something went wrong"})
            })
            .catch((err: any) => {
                console.log(`something went wrong during destructuring the token ${err}`);
                return res.status(503).json({ success: false, message: "something went wrong"})
            })
        } catch (error) {
            console.log(`something went wrong during trying to report a seller ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong"})
        }
    }

    return reportSeller
}