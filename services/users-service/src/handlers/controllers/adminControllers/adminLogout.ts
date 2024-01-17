import { Response } from "express";

export = () => {
    const adminLogout = (req: any, res: Response) => {
        try {
            res.clearCookie("adminJwt");
            return res.json({ success: true, message: 'successfully logged out'})
        } catch (error) {
            return res.json({success: false, message: 'something went wrong during logging out'})
        }
    }
    return adminLogout;
}