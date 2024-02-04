import { Router } from "express";
import verifyUserAuth from "../../utils/middleWares/checkUserAuth";
import { razorpayControllers } from "../../handlers/controllers";

export default ( dependencies: any) => {
    const router = Router()
    const {
        createOrderForRazorpayController,
        verifyRazorpayPayment
    } = razorpayControllers(dependencies)

    // we are checking is user is verified or not
    // on before all the routes;
    router.use(verifyUserAuth)

    router.post('/create-razorpay-order', createOrderForRazorpayController)
    router.post('/verify-razorpay-payment', verifyRazorpayPayment)

    return router;
}