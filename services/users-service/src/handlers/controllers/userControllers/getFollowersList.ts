import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            getFollowersList_usecase
        }
    } = dependencies;

    const getFollowersList = async ( req: Request, res: Response) => {
        // we will get user id in params;
        const userId: string = req.params.userId;
        try {
            // here we are taking the populate array of followers list ;
            const followersDocuments = await getFollowersList_usecase(dependencies).interactor(userId)
            
            if (!followersDocuments){
                return res.json({ success: false, message: "something went wrong"})
            }
            return res.json({ success: true, followers: followersDocuments, message: "followers document fetched successfully" })
        } catch (error) {
            console.log(`something went wrong during trying to populate followers document ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong'})
        }
    }

    return getFollowersList;
}