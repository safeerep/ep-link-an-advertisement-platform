import { Request, Response } from "express";
import generateResetPasswordToken from "../../../utils/externalServices/jwt/generateResetPasswondToken";
import sendEmail from "../../../utils/externalServices/nodemailer/sendResetPasswordEmail";

export = ( dependencies: any) => {
    const {
        adminUsecases: {
            findAdmin_usecase
        }
    } = dependencies;
    
    const sendEmailForResetPassword = async (req: Request, res: Response) => {
        const email: string = req.body.email;
        console.log(email);
        
        try {
            // first we have to check is it admin's email?
            const adminData = await findAdmin_usecase(dependencies).execute(email);
            
            // if there is no admin with the email specified just return
            if (!adminData) return res.json({ success: false, message: "email is not registered with us"})
            // if the admin is existing see the next try catch block
        } catch (error) {
            console.log(error);
            return res.status(503).json({ success: false, message: `something went wrong`})
        }

        try {
            // admin is existing so we have to send an email with a token to change password;
            // for that, create token first with the email
            const token = await generateResetPasswordToken(email);
            const link = 'admin/change-password';
            sendEmail(email, token, link).then(() => {
                return res.json({ success: true, message: 'Check your inbox and update password' })
            }). catch((err) => {
                console.log(err);
                return res.status(503).json({ success: false, message: `something went wrong`}) 
            })
        } catch (error) {
            console.log(error);
            return res.status(503).json({ success: false, message: `something went wrong`})
        }

    }

    return sendEmailForResetPassword;
}
