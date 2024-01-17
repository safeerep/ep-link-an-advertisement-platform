import { Request, Response, NextFunction } from "express";
import signupValidationSchema from "../../../utils/validators/signup.validator";
import generateToken from "../../../utils/externalServices/jwt/tokenGenerator";
import bcrypt from "bcrypt";

export = (dependencies: any): any => {
  const {
    usecases: { findExistingUser_usecase, register_usecase, verifyOtp_usecase },
  } = dependencies;

  const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('here ok');
    
    const userCredentials = req.body;
    console.log(userCredentials);
    try {
      let otpIsMatching = await verifyOtp_usecase(dependencies).execute(
        userCredentials?.email,
        userCredentials?.otp
      );
      if (!otpIsMatching)
        return res
          .status(401)
          .json({ success: false, message: "otp is not matching" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'something went wrong'})
    }

    try {
      // to validate the data from request with the actual data we need;
      await signupValidationSchema.validate(userCredentials, {
        abortEarly: true,
      });
    } catch (error: any) {
      console.log(`validation error:`, error);
      const errors = error.inner.map((err: any) => ({
        [err.path]: err.message,
      }));
      return res.status(400).json({ success: false, errors });
    }
    try {
      // to check email is already existing or not;
      let existingUser = await findExistingUser_usecase(dependencies).execute(
        userCredentials?.email
      );
      if (existingUser) {
        console.log(`user existing`);
        
        return res
          .status(409)
          .json({ success: false, message: "email is already taken" });
      }
    } catch (error) {
      console.log(`error from checking existing catch`, error);
      
      return res.json({ success: false, message: "something went wrong" });
    }
    try {
      // after all checkup, to create new user;
      const saltRounds: number = Number(process.env.SALT_ROUNDS) || 10;
      const salt: string = await bcrypt.genSalt(saltRounds);
      let hashedPassword: string = await bcrypt.hash(
        userCredentials.password,
        salt
      );
      userCredentials.password = hashedPassword;
      let userData = await register_usecase(dependencies).execute(
        userCredentials
      );
      if (!userData) {
        return res.json({ success: false, message: 'phone number already existing'})
      }
      const token = generateToken(userData._id);
      res.cookie( "userJwt", token, { maxAge: 30 * 24 * 60 * 60 * 1000 } )
      return res.status(201).json({ success: true, userData });
    } catch (error) {
      console.log(`here is error`, error);
      return res.status(400).json({ success: false, error });
    }
  };

  return registerUser;
};
