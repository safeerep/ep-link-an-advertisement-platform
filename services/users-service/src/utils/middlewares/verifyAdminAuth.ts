import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const verifyAdminAuth = ( req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies.adminJwt;
    const secret: string = process.env.JWT_TOKEN_SECRET || ''
    if (!token) 
        return res.status(401).json({ success: false, message: "current user is not authenticated to do it"})
    jwt.verify( token, secret, ( err: any, decodedUser: any) => {
        if (err) 
            return res.status(401).json({ success: false, message: "current user is not authenticated with valid token"})
        else next()
    })
}

export default verifyAdminAuth;