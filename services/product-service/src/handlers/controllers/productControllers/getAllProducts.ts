import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            productUsecases
        }
    } = dependencies;

    const getProducts = async ( req: Request, res: Response ) => {
        try {
            // here we trying to fetch the products
            // we will get current page in query;
            const page = req.query.page;
            const products = await productUsecases
            .getProducts_usecase(dependencies).interactor(page)
            return res.json({ success: true, currentPage: page, ...products, message: 'successfully retrieved products'})
        } catch (error) {
            console.log(`something went wrong during fetching the products ${error}`);
            return res.json({ success: false, message: "something went wrong during fetching the products" })
        }
    }

    return getProducts
}