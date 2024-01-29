import { Router } from "express";
import verifyUserAuth from "../../utils/middlewares/userAuthCheck";
import productControllers from "../../handlers/controllers/productControllers";
import upload from "../../utils/externalServices/multer/fileUpload";

export default ( dependencies: any) => {
    const router = Router();
    const {
        addProductController,
        getProductsController,
        getSpecificUserProductsController,
        getSpecificProductController,
        getAvailableProductsController,
        updateProductController,
        makeProductAvailableController,
        makeProductSoldoutController
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
    router.put('/update-product', verifyUserAuth, upload.fields([
        { name: '0', maxCount: 1 },
        { name: '1', maxCount: 1 },
        { name: '2', maxCount: 1 },
        { name: '3', maxCount: 1 },
        { name: '4', maxCount: 1 },
        { name: '5', maxCount: 1 },
        { name: '6', maxCount: 1 },
        { name: '7', maxCount: 1 },
    ]), updateProductController)
    // to make product as sold out
    router.patch('/available/:productId', verifyUserAuth, makeProductAvailableController)
    // to make product as available
    router.patch('/soldout/:productId', verifyUserAuth, makeProductSoldoutController)

    return router;
} 