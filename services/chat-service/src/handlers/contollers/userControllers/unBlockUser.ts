import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export default ( dependencies: any) => {
    const {
        usecases: {
            userUsecases
        }
    } = dependencies;

    const unBlockUser = async ( req: Request, res: Response) => {
        try {
            // we want to get the userId of the user who is going to be unblocked by current user;
            // that will be in the params
            const sellerId: string = req.params?.sellerId;
            // we want to get the current user id 
            const token: string = req.cookies.token;
            getUserId(token)
            .then( async (userId: any) => {
                const currentUserId: string = String(userId)
                // here we are going to un-block the seller;
                const updatedCurrentUserDocument = await userUsecases
                .unBlockASeller_usecase(dependencies).interactor(currentUserId, sellerId)

                if (!updatedCurrentUserDocument) {
                    return res.json({ success: false, message: "something went wrong during unblocking seller"})
                }
                return res.json({ success: true, message: "successfully unblocked the seller" })
            })
            .catch((error) => {
                console.log(`something went wrong during destructuring current user id ${error}`);
                throw new Error('something went wrong')
            })

        } catch (error) {
            console.log(`something went wrong during current user unblocking one another user ${error}`);
            return res.json({ success: false, message: "something went wrong"})
        }
    }

    return unBlockUser;
}