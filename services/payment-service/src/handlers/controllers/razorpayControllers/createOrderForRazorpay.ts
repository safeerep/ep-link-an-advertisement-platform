import { Request, Response } from "express";
import Razorpay from "razorpay";

export default () => {
    const createOrderForRazorpay = async (req: Request, res: Response) => {
        try {
            // here we will create an order with the amount we got from body;
            try {          
                // now we are creating razorpay order instance
                const { subscriptionAmount } = req.body;
                const instance = new Razorpay({
                    key_id: process.env.RAZORPAY_KEY_ID || '',
                    key_secret: process.env.RAZORPAY_KEY_SECRET
                })
                // here is the options to create an order;
                const options = {
                    amount: subscriptionAmount * 100,
                    currency: 'INR'
                }
                // creating a new order;
                const order = await instance.orders.create(options)
                // then we can return this order to further actions in client;
                return res.json({ success: true, order, message: "successfully created an order for razorpay"})
            } catch (error) {
                console.log(`something went wrong during creating a new order for razorpay ${error}`);
                return res.status(503).json({ success: false, message: "something went wrong" })
            }
           
        } catch (error) {
            console.log(`something went wrong during creating an order for razorpay ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong" })
        }
    }

    return createOrderForRazorpay;
}