import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            productUsecases
        }
    } = dependencies;

    const getReportedProducts = async ( req: Request, res: Response ) => {
        try {
            // here we trying to fetch the products
            const reportedProducts = await productUsecases
            .getReportedProducts_usecase(dependencies).interactor()
            return res.json({ success: true, message: 'successfully retrieved reported products', reportedProducts})
        } catch (error) {
            console.log(`something went wrong during fetching the reported products ${error}`);
            return res.json({ success: false, message: "something went wrong during fetching the reported products" })
        }
    }

    return getReportedProducts
}