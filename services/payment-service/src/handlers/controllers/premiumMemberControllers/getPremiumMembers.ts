import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            premiumMemberUsecases
        }
    } = dependencies;

    const getPremiumMembersList = async ( req: Request, res: Response) => {
        // here we will get the page number to skip and limit data;
        const page = req.query.page;

        try {
            const subscribers = await premiumMemberUsecases.getPremiumMembersList_usecase(dependencies).interactor(page)
            if (subscribers) {
                // here we will spread subscribers because, that will be an object which contains 
                // the count of subscribers and limited number of subscribers details;
                return res.json({ success: true, ...subscribers, currentPage: page, message: "successfully fetched subscribers list"})
            }
            else {
                return res.status(503).json({ success: false, message: "something went wrong"})
            }
        } catch (error) {
            console.log(`something went wrong during saving new member data in the premium members collection ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong"})
        }
    }

    return getPremiumMembersList;
}