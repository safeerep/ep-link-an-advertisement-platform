import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            productUsecases
        }
    } = dependencies;

    const getReportedProducts = async ( req: Request, res: Response ) => {
        try {
            // we will get current page in query
            const page = req.query.page;
            // here we trying to fetch the products
            const reportedProducts = await productUsecases
            .getReportedProducts_usecase(dependencies).interactor(page)
            return res.json({ success: true, currentPage: page, ...reportedProducts, message: 'successfully retrieved reported products'})
        } catch (error) {
            console.log(`something went wrong during fetching the reported products ${error}`);
            return res.json({ success: false, message: "something went wrong during fetching the reported products" })
        }
    }

    return getReportedProducts
}