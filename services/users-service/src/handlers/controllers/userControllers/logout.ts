import { Response } from "express";

export default () => {
    const logout = (req: any, res: Response) => {
        try {
            res.clearCookie("userJwt");
            return res.json({ success: true, message: 'successfully logged out'})
        } catch (error) {
            return res.json({success: false, message: 'something went wrong during logging out'})
        }
    }
    return logout;
}