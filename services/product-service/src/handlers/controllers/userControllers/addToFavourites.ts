import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export default ( dependencies: any) => {
    const {
        usecases: {
            userUsecases
        }
    } = dependencies;

    const addToFavourites = async ( req: Request, res: Response) => {
        try {
            // we will get product id from body
            // to add the product to favourites, we have to get userId;
            const productId = req.body.productId;
            const token: string = req.cookies.userJwt;
            const currentUserId: string = String(getUserId(token));

            // after getting current user id we can start the process of adding favourite;
            const favouritesUpdated = await userUsecases.addToFavourites_usecase(dependencies).interactor( currentUserId, productId)
            if (favouritesUpdated) {
                return res.json({ success: true, message: "successfully added new product into favourites", productId})
            }
            else throw new Error('something went wrong')
        } catch (error) {
            console.log(`something went wrong during adding new product into favourites ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong"})
        }
    }

    return addToFavourites;
}