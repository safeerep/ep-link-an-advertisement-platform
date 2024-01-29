import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            categoryUsecases
        }
    } = dependencies;

    const changeCategoryStatus = async ( req: Request, res: Response) => {

        // we will get current status and Id;
        const categoryId: string = req.body?.categoryId;
        const status: boolean = req.body?.status;
        let categories; 
        try {
            const categoriesAfterupdate = await categoryUsecases
            .changeCategoryStatus_usecase(dependencies).interactor(categoryId, status)

            // here we are setting category to the categories variable which is in the outer scope
            if (categoriesAfterupdate) categories = categoriesAfterupdate;
            // then, we have to block the products in this specified category

        } catch (error) {
            console.log('something went wrong during changing the status of category');
            return res.json({ success: false, message: 'something went wrong' })
        }

        try {
            // now we are changing the whole products' status under this category
            const productStatusUpdated = await categoryUsecases
            .changeProductsStatusByCategory_usecase(dependencies).interactor(categoryId, status)

            if (productStatusUpdated) {
                return res.json({ success: true, message: "successfully updated category status", categories })
            } 
            throw new Error ('something went wrong')
        } catch (error) {
            console.log(`something went wrong ${error}`);
            return res.status(503).json({ success: false, message :'something went wrong'})
        }
    }

    return changeCategoryStatus;
}