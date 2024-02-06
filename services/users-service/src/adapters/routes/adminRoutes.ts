import express from "express";
import { adminControllers } from "../../handlers/controllers";
import verifyAdminAuth from "../../utils/middlewares/verifyAdminAuth";

export default (dependencies: any) => {
  const router = express.Router();

  const { 
    adminLoginController,
    adminAuthCheckController,
    adminLogoutController,
    getUsersController,
    changeUserStatusController,
    adminResetPasswordController,
    changePasswordController
  } = adminControllers(dependencies);

  
  router.post("/signin", adminLoginController);
  router.get("/check-auth", adminAuthCheckController);
  router.get("/logout", adminLogoutController);
  router.post("/send-reset-password-email", adminResetPasswordController)
  router.post("/change-password", changePasswordController)

  // here we are setting authentication middleware 
  // so the routes which are coming below this line should be open to authenticated admins only;
  router.use(verifyAdminAuth)
  
  router.get("/get-all-users", getUsersController)
  router.patch("/change-user-status", changeUserStatusController)

  return router;
};
