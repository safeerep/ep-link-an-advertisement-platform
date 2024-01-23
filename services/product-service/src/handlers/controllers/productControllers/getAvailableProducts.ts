import { Request, Response } from "express";

export = ( dependencies: any) => {
    const {
        usecases: {
            productUsecases
        }
    } = dependencies;

    const getAvailableProducts = async ( req: Request, res: Response ) => {
        try {
            // here we trying to fetch the products
            const products = await productUsecases
            .getAvailableProducts_usecase(dependencies).interactor()
            return res.json({ success: true, message: 'successfully retrieved available products', products})
        } catch (error) {
            console.log(`something went wrong during fetching the products ${error}`);
            return res.json({ success: false, message: "something went wrong during fetching the products" })
        }
    }

    return getAvailableProducts
}