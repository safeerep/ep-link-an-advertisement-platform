import userSignupController from "./userSignup";
import sendOtpForSignup from "./sendOtpForSignup";
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
import updateProfile from "./updateProfile";
import getSellerProfile from "./getSellerProfile";
import reportSeller from "./reportSeller";
import getFollowersList from "./getFollowersList";
import getFollowingList from "./getFollowingList";


export default (dependencies: any) => {
    return {
        sendOtpForSignupController: sendOtpForSignup(dependencies),
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
        updateProfileController: updateProfile(dependencies),
        getSellerProfileController: getSellerProfile(dependencies),
        reportSellerController: reportSeller(dependencies),
        getFollowersListController: getFollowersList(dependencies),
        getFollowingListController: getFollowingList(dependencies)
    }
}