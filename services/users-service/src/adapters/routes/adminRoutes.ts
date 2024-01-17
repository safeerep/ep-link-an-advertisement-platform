import express from "express";
import { adminControllers } from "../../handlers/controllers";

export = (dependencies: any) => {
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
  router.get("/get-all-users", getUsersController)
  router.patch("/change-user-status", changeUserStatusController)
  router.post("/send-reset-password-email", adminResetPasswordController)
  router.post("/change-password", changePasswordController)

  return router;
};
