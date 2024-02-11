import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export default ( dependencies: any) => {
    const {
        usecases: {
            userUsecases
        }
    } = dependencies;

    const getAllTheFavourites = async ( req: Request, res: Response) => {
        try {
            // this function calls for to get all the favourites 
            // because when the products are showing to the user,
            // there should have difference between the products which is already in favourites and not in;
            // to fetch the favourites of current user, we have to get userId;
            const token: string = req.cookies.userJwt;
            const currentUserId: string = String(getUserId(token));

            // after getting current user id we can fetch all the favourite products of current user;
            const favourites = await userUsecases.getAllFavourites_usecase(dependencies).interactor( currentUserId)
            if (favourites) {
                return res.json({ success: true, favourites, message: "successfully fetched all favourites"})
            }
            else throw new Error('something went wrong')
        } catch (error) {
            console.log(`something went wrong during fetching all the favourites of current user ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong"})
        }
    }

    return getAllTheFavourites;
}