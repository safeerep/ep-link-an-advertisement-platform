import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export default ( dependencies: any) => {
    const {
        usecases: {
            unFollowUser_usecase,
            findUserWithId_usecase
        }
    } = dependencies;
    const unFollowUser = async ( req: Request, res: Response ) => {
        // we will get user id as params
        const userId: string = req.params.userId;
        if (!userId) return res.json({ success: false, message: 'user id is not in params'})

        // else we will continue
        try {
            const user = await findUserWithId_usecase(dependencies).interactor(userId);
            if (!user) return res.json({ success: false, message: "invalid user id"})
            // else we will continue in the next try catch block
        } catch (error) {
            console.log(`an error happened during checking the user id is valid or not ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong'})
        }

        // here we are going to start unfollow process
        try {
            // for to start it first we want to get current user id;
            const token = req.cookies.userJwt;
            getUserId(token)
            .then((currentUserId) => {
                if (currentUserId) {
                    const updated = unFollowUser_usecase(dependencies).interactor(currentUserId, userId)
                    if (updated) return res.json({ success: true, unFollowedUserId: userId, status: 'not-following' , message: "successfully processed unfollow"})
                    else throw new Error('some unexpected errors happened')
                }
            })
            .catch((err) => {
                console.log(`an error happened during fetching current user id from token`);
                throw new Error('error from token destructure')
            })
            // now we have two user's id and we can start ;
        } catch (error) {
            console.log(`something went wrong during trying to process follow ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong'})
        }
    }

    return unFollowUser;
}