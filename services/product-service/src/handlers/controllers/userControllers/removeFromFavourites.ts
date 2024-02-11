import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export default ( dependencies: any) => {
    const {
        usecases: {
            userUsecases
        }
    } = dependencies;

    const removeFromFavourites = async ( req: Request, res: Response) => {
        try {
            // we will get product id from body
            // to remove the product from favourites, we have to get userId;
            const productId = req.body.productId;
            const token: string = req.cookies.userJwt;
            const currentUserId: string = await getUserId(token);

            // after getting current user id we can start the process of removing a product from favourites;
            const favouritesUpdated = await userUsecases
            .removeFromFavourites_usecase(dependencies).interactor( String(currentUserId), productId)
            if (favouritesUpdated) {
                return res.json({ success: true, message: "successfully removed one product from favourites", productId})
            }
            else throw new Error('something went wrong')
        } catch (error) {
            console.log(`something went wrong during removing new product from favourites ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong"})
        }
    }

    return removeFromFavourites;
}