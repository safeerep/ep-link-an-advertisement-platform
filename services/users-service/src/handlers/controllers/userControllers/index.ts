import userSignupController from "./userSignup";
import sendOtpForSignupController from "./sendOtpForSignup";
import loginController from "./login";
import googleAuthSucceedController from "./googleAuthSucceed";
import googleAuthFailedController from "./googleAuthFailed";
import checkAuthController from "./checkAuth";
import logoutController from "./logout";
import sendResetPasswordMail from "./sendResetPasswordMail";
import verifyResetPassword from "./verifyResetPassword";
import getUserData from "./getUserData";
import follow from "./follow";
import unfollow from "./unfollow";

export = (dependencies: any) => {
    return {
        sendOtpForSignupController: sendOtpForSignupController(dependencies),
        userSignupController: userSignupController(dependencies),
        loginController: loginController(dependencies),
        googleAuthSucceedController: googleAuthSucceedController(dependencies),
        googleAuthFailedController: googleAuthFailedController(),
        checkAuthController: checkAuthController(dependencies),
        logoutController: logoutController(),
        sendResetPasswordMailController: sendResetPasswordMail(dependencies),
        changePasswordController: verifyResetPassword(dependencies),
        getUserDataController: getUserData(dependencies),
        followController: follow(dependencies),
        unfollowController: unfollow(dependencies),
    }
}