import { Request, Response } from "express";
import checkTokenAndGetUserEmail from "../../../utils/externalServices/jwt/checkTokenAndgetUserMail";
import generateToken from "../../../utils/externalServices/jwt/tokenGenerator";
import bcrypt from "bcrypt";

export = (dependencies: any) => {
    const {
        usecases: {
            upadatePassword_usecase
        }
    } = dependencies;
    const ChangeAdminPassword = ( req: Request, res: Response) => {
        const tokenToVerify: string = req?.body?.token || '';
        const password: string = req?.body?.password;
        try {
            // first we have to check is there have token or not 
            if (!tokenToVerify) return res.json({ success: false, message: 'link is invalid'})
            // we have to check passwords are matching
            if (password !== req?.body?.confirmpassword){
                return res.json({ success: false, message: 'password is not matching' }) 
            }
        } catch (error) {
            return res.status(503).json({ success: false, message: 'something went wrong'})
        }

        try {
            // we have to verify the token 
            // we previously gave a specified time frame for the validity of token 
            checkTokenAndGetUserEmail(tokenToVerify)
            .then( async (email: string) => {
                // if token is valid, we have to update password
                const saltRounds: number = Number(process.env.SALT_ROUNDS) || 10;
                const hashedPassword: string = bcrypt.hashSync(password, saltRounds)
                const adminData = await upadatePassword_usecase(dependencies).execute(email, hashedPassword)
                const token = generateToken(adminData._id);
                res.cookie( "adminJwt", token, { maxAge: 30 * 24 * 60 * 60 * 1000 })
                return res.status(200).json({ success: true, adminData, message: "password updated successfully"})
            })
            .catch((err: any) => {
                return res.json({ success: false, message : "link is invalid"})
            })
        } catch (error) {
            return res.status(503).json({ success: false, message: "something went wrong"})
        }
    }
    return ChangeAdminPassword;
}