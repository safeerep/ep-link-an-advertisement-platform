import express, { Request, Response } from "express";
import { userControllers } from "../../handlers/controllers";
import passport from "passport";
import "../../utils/externalServices/passportJs/googleAuth";
import verifyUserAuth from "../../utils/middlewares/verifyUserAuth";
import upload from "../../utils/externalServices/multerWithS3/upload";

export default (dependencies: any) => {
  const router = express.Router();

  const {
    sendOtpForSignupController,
    userSignupController,
    loginController,
    googleAuthSucceedController,
    googleAuthFailedController,
    checkAuthController,
    logoutController,
    sendResetPasswordMailController,
    changePasswordController,
    followController,
    unfollowController,
    updateProfileController,
    getSellerProfileController,
    reportSellerController,
    getFollowersListController,
    getFollowingListController
  } = userControllers(dependencies);

  router.use(passport.initialize());
  router.use(passport.session());
  router.get("/", (req: Request, res: Response) => {
    res.send("its from routes");
  });

  router.post("/send-otp-for-signup", sendOtpForSignupController);
  router.post("/signup", userSignupController);
  router.post("/signin", loginController);
  router.get(
    "/signin-with-google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  router.get(
    "/signin-with-google/redirect",
    passport.authenticate("google", {
      successRedirect: "/api/users/user/signin-success",
      failureRedirect: "/api/users/user/signin-failure",
    })
  );
  router.get("/signin-success", googleAuthSucceedController);
  router.get("/signin-failure", googleAuthFailedController);

  router.get("/check-auth", checkAuthController);
  router.get("/logout", logoutController);
  router.post("/send-reset-password-email", sendResetPasswordMailController)
  router.post("/change-password", changePasswordController)

  router.patch("/follow/:userId",verifyUserAuth, followController)
  router.patch("/unfollow/:userId",verifyUserAuth, unfollowController)

  // update user profile
  router.put("/update-profile",verifyUserAuth, upload.single('profilePhoto'), updateProfileController)
  // to retrieve seller details including seller's own products;
  router.get("/get-seller-profile/:sellerId",verifyUserAuth, getSellerProfileController)
  // to get the followers of a specific user
  router.get("/get-followers-list/:userId",verifyUserAuth, getFollowersListController)
  // to get the following list of a specific user
  router.get("/get-following-list/:userId",verifyUserAuth, getFollowingListController)
  // to report on a seller account;
  router.post("/report-seller", verifyUserAuth, reportSellerController)

  return router;
};
