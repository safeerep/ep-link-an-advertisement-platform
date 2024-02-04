import { Request, Response } from "express";
import crypto from 'crypto'

export default () => {
    const verifyRazorpayPayment = async (req: Request, res: Response) => {
        try {
            // here we will verify the payment;
            // we will get some razorpay related data in body
            const {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            } = req.body;

            // then we have to verify that the expected signature and the signature from body matches or not;
            // const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
            const razorpaySecret: string = process.env.RAZORPAY_KEY_SECRET || '';
            const signPattern = crypto.createHmac('sha256', razorpaySecret)
            .update(sign.toString()).digest('hex');

            // the we will compare the signPattern matches or not;
            if (signPattern === razorpay_signature) {
                // if yes, payment is successfull
                return res.json({ success: true, message: 'payment is successfull'})
            }
            else {
                return res.json({ success: false, message: 'something went wrong the signature is not matching'})
            }
        } catch (error) {
            console.log(`something went wrong during verifying razorpay payment`);
            return res.status(503).json({ success: false, message: 'something went wrong', error })
        }
    }

    return verifyRazorpayPayment;
}