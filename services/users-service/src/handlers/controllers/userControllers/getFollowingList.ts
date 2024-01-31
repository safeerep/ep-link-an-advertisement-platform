import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            getFollowingList_usecase
        }
    } = dependencies;

    const getFollowingList = async ( req: Request, res: Response) => {
        const userId: string = req.params.userId;
        try {
            const followingList = await getFollowingList_usecase(dependencies).interactor(userId);
            if (!followingList) {
                return res.status(503).json({ success: false, message: 'something went wrong' })
            }
            return res.json({ success: true, following: followingList, message: "successfully populated the following list"})
        } catch (error) {
            console.log(`something went wrong during populating the following of user ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong' })
        }
    }

    return getFollowingList;
}