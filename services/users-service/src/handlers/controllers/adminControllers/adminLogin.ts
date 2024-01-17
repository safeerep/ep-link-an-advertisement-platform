import { Request, Response } from "express";
import bcrypt from "bcrypt"
import generateToken from "../../../utils/externalServices/jwt/tokenGenerator";

export = (dependencies: any) => {
    const {
        adminUsecases: {
            findAdmin_usecase
        }
    } = dependencies;

    const adminLogin = async ( req: Request, res: Response) => {
        let adminData;
        try {
            // first we have to check that an admin is existing with the email came as credential;
            const adminEmail: string = req?.body?.email;
            adminData = await findAdmin_usecase(dependencies).execute(adminEmail)
            // if we can't find an admin with specified email address just return;
            console.log(adminData);
            
            if (!adminData) return res.json({ success: false, message: "invalid credentials" })
        } catch (error) {
            console.log(error);
            return res.status(503).json({ success: false, message: "something went wrong" })
        }

        try {
            // it will work only after when admin is existing with the email specified
            // now we have admin document with us;
            const password: string = req.body.password;
            const isPasswordMatching: boolean = bcrypt.compareSync(password, adminData.password);
            if (isPasswordMatching) {
                const token = generateToken(adminData._id);
                res.cookie( "adminJwt", token, { maxAge: 30 * 24 * 60 * 60 * 1000 })
                return res.status(200).json({ success: true, adminData, message: "successfully logged in" })
            } 
            else return res.json({ success: false, message: "invalid credentials"})
        } catch (error) {
            console.log(error);
            return res.json({ success: false, message: "something went wrong"})
        }
    }

    return adminLogin;
}