import { findExistingUser_usecase } from "./findExistingUser";
import { findUserWithPhone_usecase } from "./findWithPhone";
import { findUserWithId_usecase } from "./findUserWithId";
import { register_usecase } from "./register";
import { login_usecase } from "./userLogin";
import { storeOtp_usecase } from "./storeOtp";
import { verifyOtp_usecase } from "./verifyOtp";
import { upadatePassword_usecase } from "./updateUserPassword";
import { followUser_usecase } from "./followUser";
import { unFollowUser_usecase } from "./unFollowUser";
import { updateProfile_usecase } from "./updateProfile";
import { reportSeller_usecase } from "./reportSeller";
import { getFollowingList_usecase } from "./getFollowingList";
import { getFollowersList_usecase } from "./getFollowersList";
import { givePremiumMemberShip_usecase } from "./premiumMembership";

export default {
    findExistingUser_usecase,
    findUserWithPhone_usecase,
    findUserWithId_usecase,
    register_usecase,
    login_usecase,
    storeOtp_usecase,
    verifyOtp_usecase,
    upadatePassword_usecase,
    followUser_usecase,
    unFollowUser_usecase,
    updateProfile_usecase,
    reportSeller_usecase,
    getFollowersList_usecase,
    getFollowingList_usecase,
    givePremiumMemberShip_usecase
}