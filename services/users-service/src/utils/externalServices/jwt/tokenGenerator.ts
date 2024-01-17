import jwt, { Secret } from 'jsonwebtoken'
import { ObjectId } from 'mongoose'

const generateToken = (userId: ObjectId) => {
    return jwt.sign(
        {userId}, process.env.JWT_TOKEN_SECRET as Secret , {expiresIn: '30d'}
    )
}

export default generateToken;