import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            categoryUsecases
        }
    } = dependencies;

    const getActiveCategories = async ( req: Request, res: Response) => {
        try {
            const categories = await categoryUsecases.getActiveCategories_usecase(dependencies).interactor()
            return res.json({ success: true, message: 'category fetch is successfull', categories })
        } catch (error) {
            console.log(`something went wrong during fetching the list of categories ${error}`);
            return res.status(503).json({ success: false, message: `something went wrong` })
        }
    }

    return getActiveCategories;
}