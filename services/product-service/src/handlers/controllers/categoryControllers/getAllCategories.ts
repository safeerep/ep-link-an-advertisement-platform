import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            categoryUsecases
        }
    } = dependencies;

    const getAllCategories = async ( req: Request, res: Response) => {
        try {
            // we will get currentpage in query;
            const page = req.query.page;
            const categories = await categoryUsecases.getCategories_usecase(dependencies).interactor(page)
            return res.json({ success: true, ...categories, currentPage: page, message: 'category fetch is successfull' })
        } catch (error) {
            console.log(`something went wrong during fetching the list of categories ${error}`);
            return res.status(503).json({ success: false, message: `something went wrong` })
        }
    }

    return getAllCategories;
}