import createOrderForRazorpay from "./createOrderForRazorpay"
import verifyRazorpayPayment from "./verifyRazorpayPayment"

export default (dependencies: any) => {
    return {
        createOrderForRazorpayController: createOrderForRazorpay(),
        verifyRazorpayPayment: verifyRazorpayPayment()
    }
}