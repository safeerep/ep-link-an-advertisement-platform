import { Request, Response } from "express";

export default ( dependencies: any) => {
    const {
        usecases: {
            productUsecases
        }
    } = dependencies;

    const banOneProduct = async ( req: Request, res: Response ) => {
        try {
            // here we trying to fetch the products
            const { productId, status } = req.body;
            const bannedProduct = await productUsecases
            .banProduct_usecase(dependencies).interactor(productId, status)
            return res.json({ success: true, message: 'banned a specific product successfully', bannedProduct})
        } catch (error) {
            console.log(`something went wrong during banning the product ${error}`);
            return res.json({ success: false, message: "something went wrong during banning a product" })
        }
    }

    return banOneProduct;
}