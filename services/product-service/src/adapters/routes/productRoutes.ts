import { Router } from "express";
import verifyUserAuth from "../../utils/middlewares/userAuthCheck";
import productControllers from "../../handlers/controllers/productControllers";
import upload from "../../utils/externalServices/multer/fileUpload";
import verifyAdminAuth from "../../utils/middlewares/adminAuthCheck";

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
        makeProductSoldoutController,
        banOneProductController,
        getCountOfProductsAddedByUserController,
        reportProductController,
        getReportedProductsController,
    }
    = productControllers(dependencies)

    // fetching products for user
    router.get('/get-all-products', getAvailableProductsController)
    // fetching products for admin
    router.get('/admin/get-all-products', verifyAdminAuth, getProductsController)
    // fetching reported products only for admin
    router.get('/admin/get-reported-products', verifyAdminAuth, getReportedProductsController)
    // banning a specific product by admin
    router.patch('/ban-one-product', verifyAdminAuth, banOneProductController)

    // authentication required all the below routes;
    router.use(verifyUserAuth)
    // using upload as a middleware to upload image in to aws s3 bucket
    router.post('/add-product', upload.array('images'), addProductController)
    // fetching a specified user's products only to show in profile
    router.get('/current-user-products', getSpecificUserProductsController)
    // fetching details of a specific product to show detailed info
    router.get('/get-specific-product/:productId', getSpecificProductController)
    // to update a product' details
    router.put('/update-product', upload.fields([
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
    router.patch('/available/:productId', makeProductAvailableController)
    // to make product as available
    router.patch('/soldout/:productId', makeProductSoldoutController)
    // to check the count of products added by a specific user;
    router.get('/check-current-user-product-count', getCountOfProductsAddedByUserController)
    // to report a product;
    router.post('/report-one-product', reportProductController)

    return router;
} 