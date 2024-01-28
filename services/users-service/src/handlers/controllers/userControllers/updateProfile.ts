import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export = ( dependencies: any) => {
    const {
        usecases: {
            updateProfile_usecase
        }
    } = dependencies;

    const updateProfileData = async ( req: Request, res: Response) => {
        // first we setting profile photo from aws s3
        if (req?.file) {
            req.body.profilePhoto = (req?.file as any).location;
        }
        if (req.body?.phone) {
            req.body.phone = Number(req.body?.phone);
        }

        let currentUserId: string;

        try {
            // first we have to fetch user id 
            const token = req.cookies.userJwt;
            getUserId(token)
            .then( async (userId: string) => {
                currentUserId = String(userId)
                const updatedUserData = await updateProfile_usecase(dependencies).interactor(currentUserId, req.body)
                if (updatedUserData) {
                    return res.json({ success: true, message: 'successfully updated user profile', userData: updatedUserData })
                }
                else throw new Error('something went wrong')
            })
            .catch((err: any) => {
                console.log(`an error happened during fetching current user's id ${err}`);
                return res.json({ success: false, message: 'something went wrong' })
            })
        } catch (error) {
            console.log(`an error happened during fetching curent user's id ${error}`);
            return res.json({ success: false, message: "something went wrong"})
        }

    }

    return updateProfileData;
}