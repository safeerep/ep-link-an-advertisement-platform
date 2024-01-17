import { Response } from 'express'
import generateToken from "../../../utils/externalServices/jwt/tokenGenerator"

export = (dependencies: any) => {

    const {
        usecases: { findExistingUser_usecase, register_usecase}
      } = dependencies;

    const googleAuthSucceed = async (req: any, res: Response) => {

        // for already registered user;
        try {
            if (req?.user) {
                const userCredentials = req.user;
                console.log('from user controller');
                console.log(userCredentials);
                let existingUser = await findExistingUser_usecase(dependencies).execute(
                    userCredentials?.email
                );
                if (existingUser) {
                    const token = generateToken(existingUser._id)
                    res.cookie( "userJwt", token, { maxAge: 30 * 24 * 60 * 60 * 1000 } )
                    return res.redirect(process.env.CLIENT_URL + '')
                }
            } else {
                return res.redirect(process.env.CLIENT_URL + '')
            }
        } catch (error) {
            return res.redirect(process.env.CLIENT_URL + '')         
        }

        // for new user
        try {
            if (req?.user) {
                const userCredentials = req.user;
                let newUser = await register_usecase(dependencies).execute(
                    userCredentials
                );
                if (newUser) {
                    const token = generateToken(newUser._id)
                    res.cookie( "userJwt", token, { maxAge: 30 * 24 * 60 * 60 * 1000 })
                    console.log(`added new user`);
                    return res.redirect(process.env.CLIENT_URL + '')
                } else {
                    return res.redirect(process.env.CLIENT_URL + '')
                }
            }
            else {
                return res.redirect(process.env.CLIENT_URL + '')
            }
        } catch (error) {
            console.log('something went wrong', error);
            return res.redirect(process.env.CLIENT_URL + '')
        }
    } 
    return googleAuthSucceed;
}