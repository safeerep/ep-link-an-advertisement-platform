import { Router } from "express";
import { premiumPlansControllers } from "../../handlers/controllers";
import verifyAdminAuth from "../../utils/middleWares/checkAdminAuth";
import verifyUserAuth from "../../utils/middleWares/checkUserAuth";

export default ( dependencies: any) => {
    const router = Router();
    const {
        updatePremiumPlanController, 
        getAllPlanDetailsController
    } = premiumPlansControllers(dependencies)

    router.get('/get-all-plans', verifyUserAuth, getAllPlanDetailsController)
    
    // the routes below this wil be accessible only for admin;
    router.use(verifyAdminAuth)
    router.get('/admin/get-all-plans', getAllPlanDetailsController)
    router.put('/update', updatePremiumPlanController)

    return router;
}