import { updateUserProfileToPremium, verifyRazorpayPayment } from "@/store/actions/userActions/userActions";
import { AppDispatch } from "@/store/store";

export const initializepayment = (order: any, dispatch: AppDispatch, policyDuration: string) => {
    // const razorpayKeyId: string = process.env.RAZORPAY_KEY_ID || ''
    console.log(order.amount);

    const imageName = "brand.png";
    var options = {
        key: 'rzp_test_4KYXC57Tjb8Rt5',
        amount: order.amount,
        currency: "INR",
        name: "EP LINK",
        description: "Test Transaction",
        image: imageName,
        order_id: order.id,
        handler: (response: any) => verifyPayment({ ...response }, dispatch, policyDuration),
        prefill: {
            user: "user"
        },
        notes: { address: "Razorpay Corporate Office" },
        theme: { color: "#3399cc" },
    };
    const rzp1 = new window.Razorpay(options)
    rzp1.on("payment.failed", (response: any) => {
        alert(response.error.reason + '\n please try again later')
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
    });

    rzp1.open()
}

const verifyPayment = async (response: any, dispatch: any, policyDuration: string) => {
    const paymentSuccessfull: boolean | any = await verifyRazorpayPayment(response)

    if (paymentSuccessfull) {
        console.log('yes payment successfull');
        dispatch(updateUserProfileToPremium(policyDuration))
    }
}