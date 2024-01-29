import { Response } from "express";

export default () => {
    const googleAuthFailed = (req: any, res: Response) => {
        return res.redirect(process.env.CLIENT_URL + '');
    }
    return googleAuthFailed;
}


