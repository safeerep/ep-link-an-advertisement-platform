import { updateUserProfileToPremium, verifyRazorpayPayment } from "@/store/actions/userActions/userActions";

export const initializepayment = (order: any) => {
    const razorpayKeyId: string = process.env.RAZORPAY_KEY_ID || ''
    const imageName = "brand.png";
    var options = {
        key: razorpayKeyId,
        amount: order?.amount,
        currency: "INR",
        name: "EP LINK",
        description: "Test Transaction",
        image: imageName,
        order_id: order?.id,
        handler: (response: any) => verifyPayment(response),
        prefill: { 
            user: "user"
        },
        notes: { address: "Razorpay Corporate Office" },
        theme: { color: "#3399cc" },
    };
    const rzp1 = new window.Razorpay(options)
    rzp1.on("payment.failed", (response: any) => {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });

    rzp1.open()
}

const verifyPayment = async (response: any) => {
    const paymentSuccessfull: boolean | any = await verifyRazorpayPayment(response)

    if (paymentSuccessfull) {
        updateUserProfileToPremium()
    }
}