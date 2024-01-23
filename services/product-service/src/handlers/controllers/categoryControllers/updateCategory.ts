import { Request, Response } from "express";

export = ( dependencies: any) => {
    const {
        usecases: {
            categoryUsecases
        }
    } = dependencies;
    const updateCategoryDetails = async ( req: Request, res: Response) => {

        try {
            // at first we have to verify is there existing the category or not;
            const categoryId = req.body.categoryId;
            const categoryExisting = await categoryUsecases
            .isCategoryExistWithId_usecase(dependencies).interactor(categoryId);
            // if there is no category with the Id provided, that means the category id is not valid
            // so, return;
            if (!categoryExisting) {
                return res.json({ success: false, message: "given category id is not valid" })
            }
        } catch (error) {
            console.log(`something went wrong during checking the category is existing or not ${error}`);
            return res.json({ success: false, message: "something went wrong"})
        }

        try {
            // now we ensured that category id is valid, so we can update category details;
            const categoryId: string = req?.body?.categoryId;
            const categories = await categoryUsecases
            .updateCategoryDetails_usecase(dependencies).interactor(categoryId, req?.body)
            if (!categories) {
                return res.json({ success: false, message: "category name is already existing"})
            }
            else {
                return res.json({ success: true, message: "successfully updated the category details", categories })
            }
        } catch (error) {
            console.log(`something went wrong during updating the category ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong" })
        }
    }

    return updateCategoryDetails;
}