import { Request, Response, NextFunction } from "express";
import signinValidationSchema from "../../../utils/validators/signin.validator";
import generateToken from "../../../utils/externalServices/jwt/tokenGenerator";
import bcrypt from "bcrypt";

export = (dependencies: any): any => {
  const {
    usecases: { findExistingUser_usecase },
  } = dependencies;

  const login = async (req: Request, res: Response, next: NextFunction) => {
    const userCredentials = req.body;
    try {
      // to validate the data from request with the actual data we need;
      await signinValidationSchema.validate(userCredentials, {
        abortEarly: true,
      });
    } catch (error: any) {
      const errors = error.inner.map((err: any) => ({
        [err.path]: err.message,
      }));
      return res.status(400).json({ success: false, message: errors[0] });
    }
    let userData;
    try {
      userData = await findExistingUser_usecase(dependencies).execute(
        userCredentials.email
      );
      console.log(userData);
      
      if (!userData) {
        return res
          .status(401)
          .json({ success: false, message: "invalid credentials" });
      }
      
      // now user is present and so, we want to check user is blocked or not
      if (!userData.status) {
        console.log('status false');
        return res.json({ success: false, message: "you are blocked from this application" })
      }
      
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "something went wrong" });
    }

    try {
      console.log('try w');
      
        const isPasswordMatching = await bcrypt.compare(userCredentials.password, userData.password);
        if (isPasswordMatching) {
            const token = generateToken(userData._id) 
            res.cookie( "userJwt", token, { maxAge: 30 * 24 * 60 * 60 * 1000 })
            return res.status(200).json({ success: true, userData, message: 'successfully logged in'})
        }
        else return res.status(401).json({ success: false, message: 'invalid credentials'})
    } catch (error) {
        return res.status(401).json({ success: false, message: 'something went wrong'})
    }
  };

  return login;
};
