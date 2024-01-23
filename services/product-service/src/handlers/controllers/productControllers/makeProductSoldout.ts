import { Request, Response } from "express";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export = (dependencies: any) => {
    const {
        usecases: {
            productUsecases
        }
    } = dependencies;

    const makeProductSoldOut = async ( req: Request, res: Response) => {

        const productId: string = req.params.productId;
        if (!productId) return res.json({ success: false, message: 'there is no product id in params'})

        try {
            // if we got product id we have to check the product id is valid or not
            const product = await productUsecases
            .getOneSpecificProduct_usecase(dependencies).interactor(productId)

            if(!product) return res.json({ success: false, message: "invalid product id" })
            // else we will continue in the next try catch block
        } catch (error) {
            console.log(`an error happened during checking the product is existing or not ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong' })
        }

        try {
            const updatedProduct = await productUsecases
            .makeProductAsSoldout_usecase(dependencies).interactor(productId)

            if (!updatedProduct) return res.json({ success: false, message: 'something went wrong'})
            // else we will fetch current user's products and return it in next try catch block;
        } catch (error) {
            console.log(`an error happened during making the product status as available ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong' })
        }

        try {
            const token = req.cookies.userJwt;
            getUserId(token)
            .then( async (userId) => {
                const products = await productUsecases.getCurrentUserProducts_usecase(dependencies).interactor(userId)
                return res.json({ success: true, products, message: 'successfully updated product status as available'})
            })
            .catch((err) => {
                throw new Error(err)
            })
        } catch (error) {
            console.log(`something went wrong during fetching allthe products added by current user ${error}`);
            return res.status(503).json({ success: false, message: 'something went wrong' })
        }
    }

    return makeProductSoldOut;
}