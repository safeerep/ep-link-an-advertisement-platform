import { Router } from "express";
import categoryControllers from "../../handlers/controllers/categoryControllers";
import verifyAdminAuth from "../../utils/middlewares/adminAuthCheck";
import verifyUserAuth from "../../utils/middlewares/userAuthCheck";

export = ( dependencies: any) => {    
    const router = Router();

    const {
        addNewCategoryController,
        getAllCategoriesController,
        changeCategoryStatusController,
        getCurrentCategoryController,
        updateCategoryController,
        getActiveCategoriesController
    } = categoryControllers(dependencies)

    // admin only routes
    router.post('/add-category', verifyAdminAuth, addNewCategoryController)
    router.get('/get-all-categories', verifyAdminAuth, getAllCategoriesController)
    router.patch('/change-category-status', verifyAdminAuth, changeCategoryStatusController)
    router.get('/get-details/:categoryId', verifyAdminAuth, getCurrentCategoryController)
    router.put('/update-category', verifyAdminAuth, updateCategoryController)

    // user routes
    // giving categories to select one for adding product;
    router.get('/get-all-categories-user', verifyUserAuth, getActiveCategoriesController)

    return router;
}