import { updateUser } from "./userRepo";
import { checkIsBlockedOrNot } from "./userRepo";
import { blockASeller } from "./userRepo";
import { unBlockASeller } from "./userRepo";
import { getUserData } from "./userRepo";

export default {
    updateUser,
    checkIsBlockedOrNot,
    blockASeller,
    unBlockASeller,
    getUserData
}