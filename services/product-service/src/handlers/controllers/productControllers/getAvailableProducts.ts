import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            productUsecases
        }
    } = dependencies;

    const getAvailableProducts = async ( req: Request, res: Response ) => {
        try {
            // we will get current page in query
            // here we trying to fetch the products
            const page = req.query.page;
            const products = await productUsecases
            .getAvailableProducts_usecase(dependencies).interactor(page)
            return res.json({ success: true, currentPage: page, ...products, message: 'successfully retrieved available products'})
        } catch (error) {
            console.log(`something went wrong during fetching the products ${error}`);
            return res.json({ success: false, message: "something went wrong during fetching the products" })
        }
    }

    return getAvailableProducts
}