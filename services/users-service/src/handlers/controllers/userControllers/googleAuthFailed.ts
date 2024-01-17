import { Response } from "express";

export = () => {
    const googleAuthFailed = (req: any, res: Response) => {
        return res.redirect(process.env.CLIENT_URL + '');
    }
    return googleAuthFailed;
}


