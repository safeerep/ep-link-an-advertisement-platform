import { Request, Response } from "express";

export = ( dependencies: any) => {
    const {
        usecases: {
            categoryUsecases
        }
    } = dependencies;

    const addNewCategory = async ( req: Request, res: Response) => {
        // first we want to check is there already existing a category with this name or not
        // if existing, we don't want to create new one
        try {
            const categoryName: string = req.body?.categoryName;
            const existingCategory = await categoryUsecases.checkIsCategoryExisting_usecase(dependencies).interactor(categoryName)
            if (existingCategory) {
                return res.status(409).json({ success: false, message: 'category name is already existing'})
            }
            // else we will continue 
        } catch (error) {
            console.log(`an error happened during checking the category is existing or not ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong' })
        }

        // try to add new category
        try {
            const newCategory = await categoryUsecases.addNewCategory_usecase(dependencies).interactor(req.body)
            if (newCategory) return res.status(201).json({ success: true, message: "successfully added new category"})
            return res.status(503).json({ success: false, message: 'something went wrong'})
        } catch (error) {
            console.log(`something went wrong during adding a new category`);
            return res.status(503).json({ success: false, message: 'something went wrong'})
        }
    }

    return addNewCategory;
}