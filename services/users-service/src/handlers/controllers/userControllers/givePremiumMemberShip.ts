import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export default (dependencies: any) => {
    const {
        usecases: {
            givePremiumMemberShip_usecase,
            findUserWithId_usecase
        }
    } = dependencies;

    const givePremiumMemberShip = async (req: Request, res: Response) => {
        try {
            // for to start it first we want to get current user id;
            const token: string | undefined = req.cookies?.userJwt;
            const currentUserId: string = await getUserId(token)
            // first we are going to verify that, there have one user with verified id;
            const foundUser = await findUserWithId_usecase(dependencies).interactor(String(currentUserId))
            if(!foundUser) return res.status(401).json({ success: false, message: 'invalid user id'})
            // else we will continue in next block;
        } catch (error) {
            console.log(`something went wrong during trying to get user data ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong' })
        }

        try {
            // here we are going to update user profile as premium member;
            const token: string | undefined = req.cookies?.userJwt;
            const currentUserId: string = await getUserId(token)
            const { subscriptionPolicy } = req.body;

            const updatedUserProfile = await givePremiumMemberShip_usecase(dependencies)
            .interactor( String(currentUserId), subscriptionPolicy)

            if (!updatedUserProfile) {
                return res.status(503).json({ success: false, message: 'something went wrong'})
            }
            else {
                return res.status(503).json({ success: true, updatedUserProfile, message: `successfully subscribed ${subscriptionPolicy} subscription policy`})
            }
        } catch (error) {
            console.log(`something went wrong during making user as premium member;`);
            return res.status(503).json({ success: false, message: 'something went wrong'})
        }
    }

    return givePremiumMemberShip;
}