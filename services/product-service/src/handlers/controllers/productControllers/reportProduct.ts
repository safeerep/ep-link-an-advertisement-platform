import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";
import mongoose from "mongoose";

export default ( dependencies: any) => {
    const {
        usecases: {
            productUsecases
        }
    } = dependencies;

    const reportProduct = async ( req: Request, res: Response) => {
        const { productId, reason } = req.body;
        if (!productId || !reason) {
            return res.json({ success: false, message: "request is not having enough data"})
        }

        try {
            const product = await productUsecases
            .getOneSpecificProduct_usecase(dependencies).interactor(productId)
            if (!product) {
                return res.json({ success: false, message: 'product is not existing'})
            }
            // else we will continue in the next block
        } catch (error) {
            console.log(`something went wrong during checking the product id is valid or not to report ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong"})
        }

        try {
            // we have to find, who is reported(current user)
            const token: string = req.cookies.userJwt;
            getUserId(token)
            .then( async (userId: any) => {
                const currentUserId = String(userId)
                // now we can pass the data to report product
                const reportObj = {
                    reportedBy: new mongoose.Types.ObjectId(productId),
                    reason: reason
                }
                const reported = await productUsecases
                .reportProduct_usecase(dependencies).interactor( productId, reportObj)
                if (reported) {
                    return res.json({ success: true, message: 'successfully reported a product'})
                }
                return res.status(503).json({ success: false, message: "something went wrong"})
            })
            .catch((err: any) => {
                console.log(`something went wrong during destructuring the token ${err}`);
                return res.status(503).json({ success: false, message: "something went wrong"})
            })
        } catch (error) {
            console.log(`something went wrong during trying to report a product ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong"})
        }
    }

    return reportProduct;
}