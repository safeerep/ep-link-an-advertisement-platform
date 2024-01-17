import jwt, { Secret } from 'jsonwebtoken'

const generateResetPasswordToken = (email: string) => {
    return jwt.sign(
        {email}, process.env.JWT_TOKEN_SECRET as Secret , { expiresIn: '10m' }
    )
}

export default generateResetPasswordToken;