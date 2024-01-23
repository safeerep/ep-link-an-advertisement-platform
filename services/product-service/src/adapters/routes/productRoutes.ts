import { Router } from "express";
import verifyUserAuth from "../../utils/middlewares/userAuthCheck";
import productControllers from "../../handlers/controllers/productControllers";
import upload from "../../utils/externalServices/multer/fileUpload";

export = ( dependencies: any) => {
    const router = Router();
    const {
        addProductController,
        getProductsController,
        getSpecificUserProductsController,
        getSpecificProductController,
        getAvailableProductsController,
        updateProductController
    }
    = productControllers(dependencies)

    // using upload as a middleware to upload image in to aws s3 bucket
    router.post('/add-product', verifyUserAuth, upload.array('images'), addProductController)
    // fetching products for user
    router.get('/get-all-products', verifyUserAuth, getAvailableProductsController)
    // fetching a specified user's products only to show in profile
    router.get('/current-user-products', verifyUserAuth, getSpecificUserProductsController)
    // fetching details of a specific product to show detailed info
    router.get('/get-specific-product/:productId', verifyUserAuth, getSpecificProductController)
    // to update a product' details
    router.put('/update-product', verifyUserAuth, upload.array('images'), updateProductController)
    // to make product as sold out
    router.patch('/available/:productId', verifyUserAuth, )
    // to make product as available
    router.patch('/soldout/:productId', verifyUserAuth, )

    return router;
} 