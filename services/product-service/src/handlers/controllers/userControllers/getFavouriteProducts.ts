import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export default ( dependencies: any) => {
    const {
        usecases: {
            userUsecases
        }
    } = dependencies;

    const getFavourites = async ( req: Request, res: Response) => {
        try {
            // this function calls for to get the favourite product details;
            // to fetch the favourites of current user, we have to get userId;
            const token: string = req.cookies.userJwt;
            const currentUserId: string = String(getUserId(token));
            // also we will get the current page of favourites showing, in query;
            const page = req.query.page;

            // after getting current user id we can fetch favourite products of current user;
            const favourites = await userUsecases.getFavourites_usecase(dependencies).interactor( currentUserId, page)
            if (favourites) {
                return res.json({ success: true, favourites, message: "successfully fetched favourites"})
            }
            else throw new Error('something went wrong')
        } catch (error) {
            console.log(`something went wrong during fetching favourite products of current user ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong"})
        }
    }

    return getFavourites;
}