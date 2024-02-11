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
            const productsCount = await productUsecases.getCurrentUserProductsCount_usecase(dependencies).interactor(userId)
            if (productsCount) {
                return res.json({ success: true, addedProductCount: productsCount, message: "successfully fetched count of current user's products"})
            }
        } catch (error) {
            console.log(`something went wrong during fetching a specific user's products count ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong" })
        }
    }

    return getSpecificUserProduct;
}