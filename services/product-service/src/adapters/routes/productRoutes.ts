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
    }
    = productControllers(dependencies)

    router.post('/add-product', verifyUserAuth, upload.array('images'), addProductController)
    router.get('/get-all-products', verifyUserAuth, getProductsController)
    router.get('/current-user-products', verifyUserAuth, getSpecificUserProductsController)
    router.get('/get-specific-product/:productId', verifyUserAuth, getSpecificProductController)

    return router;
} 