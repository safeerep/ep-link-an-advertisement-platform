import { Request, Response } from "express";
import verifyToken from "../../../utils/externalServices/jwt/tokenChecker";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export = ( dependencies: any) => {
    const {
        usecases : { findUserWithId_usecase }
    } = dependencies;

  const checkUserAuth = async (req: Request, res: Response) => {
    const token = req.cookies.userJwt;
    try {
      console.log('token is ');
      console.log(token);
      
      if (token) {        
        const validToken: boolean = await verifyToken(token);
        if (!validToken) {
            return res.json({
              success: false,
              message: "user is not authenticated",
            });
        }
        // here not writing else case because,
        // user is authenticated and so going to fetch user data in next try catch block;
      } else {
        // don't have token        
        return res.json({
          success: false,
          message: "user is not yet authenticated",
        });
      }
    } catch (error) {
      console.log(`something went wrong with ${error}`);
      return res.json({ success: false, message: "something went wrong" });
    }
    
    try {
        // user is authenticated and we are needed to pass userdata
        // first we want to get userId to fetch userdata
        const userId = await getUserId(token);
        if (userId) {
            const userData = await findUserWithId_usecase(dependencies).execute(userId);
            // now we want to check user status 
            // if status is false - it means admin blocked this user
            if (!userData.status) {
              // we are clearing token of user
              res.clearCookie("userJwt")
              return res.json({ success: false, message: "You are now blocked from this application"})
            }
            return res.json({ success: true, message: `user is authenticated`, userData})
        }
    } catch (error) {
        console.log(`something went wrong ${error}`);
        return res.json({ success: false, message: `some unexpected errors happened`})
    }
  };
  return checkUserAuth;
};
