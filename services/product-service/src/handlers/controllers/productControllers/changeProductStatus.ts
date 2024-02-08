import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            productUsecases
        }
    } = dependencies;

    const changeProductStatus = async ( req: Request, res: Response ) => {
        try {
            // here we trying to fetch the products
            const { productId, status } = req.body;
            const bannedProduct = await productUsecases
            .changeProductStatus_usecase(dependencies).interactor(productId, status)
            return res.json({ success: true, message: 'successfully changed the status of product', bannedProduct})
        } catch (error) {
            console.log(`something went wrong during changing the status of product ${error}`);
            return res.json({ success: false, message: "something went wrong during changing the status of product" })
        }
    }

    return changeProductStatus;
}