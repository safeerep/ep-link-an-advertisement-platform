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
    getFollowingListController,
    givePremiumMemberShipController
  } = userControllers(dependencies);

  // these following two middlewares are used to have google auth;
  router.use(passport.initialize());
  router.use(passport.session());
  // router.get("/", (req: Request, res: Response) => {
  //   res.send("its from routes");
  // });

  // to send otp on new user signup
  router.post("/send-otp-for-signup", sendOtpForSignupController);
  // to verify user data to create a new user;
  router.post("/signup", userSignupController);
  // to provide signin functionality to already existing user;
  router.post("/signin", loginController);
  // to sign in with google;
  router.get(
    "/signin-with-google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  // to redirect on success/ failure of google auth;
  router.get(
    "/signin-with-google/redirect",
    passport.authenticate("google", {
      successRedirect: "/api/users/user/signin-success",
      failureRedirect: "/api/users/user/signin-failure",
    })
  );
  // signin success with google a/c
  router.get("/signin-success", googleAuthSucceedController);
  // signin failed with google a/c
  router.get("/signin-failure", googleAuthFailedController);

  router.get("/check-auth", checkAuthController);
  router.get("/logout", logoutController);
  router.post("/send-reset-password-email", sendResetPasswordMailController)
  router.post("/change-password", changePasswordController)

  // here we are setting user authentication as a middleware,
  // so the routes below this line will be protected to access only from authenticated users;
  router.use(verifyUserAuth)

  // to follow one user
  router.patch("/follow/:userId", followController)
  // to unfollow one user
  router.patch("/unfollow/:userId", unfollowController)
  // update user profile
  router.put("/update-profile", upload.single('profilePhoto'), updateProfileController)
  // to retrieve seller details including seller's own products;
  router.get("/get-seller-profile/:sellerId", getSellerProfileController)
  // to get the followers of a specific user
  router.get("/get-followers-list/:userId", getFollowersListController)
  // to get the following list of a specific user
  router.get("/get-following-list/:userId", getFollowingListController)
  // to report on a seller account;
  router.post("/report-seller", reportSellerController)
  // to update user profile to premium
  router.patch("/update-to-premium", givePremiumMemberShipController)

  return router;
};
