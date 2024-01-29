import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export default ( dependencies: any) => {
    const {
        usecases: {
            productUsecases
        }
    } = dependencies;

    const getSpecificUserProduct = async ( req: Request, res: Response) => {
        try {
            // to fetch a specific user's products only,
            // we have to get that user's id first
            const token = req.cookies.userJwt;
            const userId = await getUserId(token)
            // after getting user id, we can fetch the products simply
            const products = await productUsecases.getCurrentUserProducts_usecase(dependencies).interactor(userId)
            return res.json({ success: true, message: "successfully fetched current user's products", products })
        } catch (error) {
            console.log(`something went wrong during fetching a specific user's products ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong" })
        }
    }

    return getSpecificUserProduct;
}