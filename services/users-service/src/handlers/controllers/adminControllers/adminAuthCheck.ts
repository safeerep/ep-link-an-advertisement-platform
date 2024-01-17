import { Request, Response } from "express";
import verifyToken from "../../../utils/externalServices/jwt/tokenChecker";
import getUserId from "../../../utils/externalServices/jwt/getUserId";

export = ( dependencies: any) => {
    const {
        adminUsecases : { findAdminWithId_usecase }
    } = dependencies;

  const checkAdminAuth = async (req: Request, res: Response) => {
    const token = req.cookies.adminJwt;
    try {
      if (token) {        
        const validToken: boolean = await verifyToken(token);
        if (!validToken) {
            return res.json({
              success: false,
              message: "admin is not authenticated",
            });
        }
        // here not writing else case because,
        // admin is authenticated and so going to fetch admin data in next try catch block;
      } else {
        // don't have token        
        return res.json({
          success: false,
          message: "admin is not yet authenticated",
        });
      }
    } catch (error) {
      console.log(`something went wrong with ${error}`);
      return res.json({ success: false, message: "something went wrong" });
    }
    
    try {
        // admin is authenticated and we are needed to pass admindata
        // first we want to get admin to fetch admindata
        const adminId = await getUserId(token);
        
        if (adminId) {
            const adminData = await findAdminWithId_usecase(dependencies).execute(adminId);
            console.log(adminData);
            
            return res.json({ success: true, message: `admin is authenticated`, adminData})
        }
    } catch (error) {
        console.log(`something went wrong ${error}`);
        return res.json({ success: false, message: `some unexpected errors happened`})
    }
  };
  return checkAdminAuth;
};
