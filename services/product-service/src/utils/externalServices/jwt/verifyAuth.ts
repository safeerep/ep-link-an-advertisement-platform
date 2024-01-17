import jwt from 'jsonwebtoken'

const verifyToken = ( token: string) => {
    return new Promise((resolve, reject) => {
        const secret: string = process.env.JWT_TOKEN_SECRET || ''
        jwt.verify( token, secret, ( err: any, decodedUser: any) => {
            if (err) resolve(false)
            else resolve(true)
        })
    })
}

export default verifyToken;