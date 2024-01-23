import { Request, Response } from "express";
import generateResetPasswordToken from "../../../utils/externalServices/jwt/generateResetPasswondToken";
import sendEmail from "../../../utils/externalServices/nodemailer/sendResetPasswordEmail";

export = ( dependencies: any) => {
    const {
        usecases: {
            findExistingUser_usecase
        }
    } = dependencies;
    const sendEmailForResetPassword = async (req: Request, res: Response) => {
        const email: string = req.body.email;
        console.log(req.body);
        
        try {
            // first we have to check is user existing?
            const userData = await findExistingUser_usecase(dependencies).interactor(email);
            
            // if there is no user with the email specified just return
            if (!userData) return res.json({ success: false, message: "email is not registered with us"})
            if (!userData.status) return res.json({ success: false, message: "you are blocked from this application"})
            // if the user is existing see the next try catch block
        } catch (error) {
            console.log(error);
            return res.status(503).json({ success: false, message: `something went wrong`})
        }

        try {
            // user is existing so we have to send an email with a token to change password;
            // for that, create token first with the email
            const token = await generateResetPasswordToken(email);
            const link = 'change-password';
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
