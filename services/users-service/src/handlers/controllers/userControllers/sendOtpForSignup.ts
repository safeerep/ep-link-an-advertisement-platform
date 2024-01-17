import { Request, Response, NextFunction } from "express";
import { sendOtp } from "../../../utils/externalServices";

export = ( dependencies: any): any => {
    const { usecases: {
        storeOtp_usecase,
        findExistingUser_usecase,
        findUserWithPhone_usecase,
    }} = dependencies;
    const sendOtpForSignupController = async ( req: Request, res: Response, next: NextFunction) => {
        const email: string = req.body.email;
        const phone: number = req.body.phone;
        try {
            let existingUser = await findExistingUser_usecase(dependencies).execute(
                email
            );
            if (existingUser) return res.json({ success: false, message: 'email is already registered'})
        } catch (error) {
            return res.json({ success: false, message: 'something went wrong'})
        }

        try {
            if (phone !== null) {
                const existingUser = await findUserWithPhone_usecase(dependencies).execute(
                    phone
                );
                if (existingUser) return res.json({ success: false, message: 'phone number is already registered'})
            }
        } catch (error) {
            return res.json({ success: false, message: 'something went wrong'})
        }
        try {
            const otp =  Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
            const sentSuccessfully: boolean | any = sendOtp( otp, email)

            const otpStored = await storeOtp_usecase(dependencies).execute(email, otp)            

            if (sentSuccessfully) return res.json({ success: true, message: 'otp sent successfully through email'})
            return res.json({ success: false, message: "something went wrong"})
        } catch (error) {
            return res.json({ success: false, message: 'oops! something went wrong'})
        }
    }

    return sendOtpForSignupController;
}

