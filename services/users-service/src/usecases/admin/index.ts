import { findAdmin_usecase } from "./findAdminWithEmail";
import { findAdminWithId_usecase } from "./findAdminWithId";
import { getAllUsers_usecase } from "./getAllUsers";
import { changeUserStatus_usecase } from "./changeUserStatus";
import { getReportedUsers_usecase } from "./getReportedUsers";
import { upadatePassword_usecase } from "./changePassword";

export default {
    findAdmin_usecase,
    findAdminWithId_usecase,
    getAllUsers_usecase,
    changeUserStatus_usecase,
    getReportedUsers_usecase,
    upadatePassword_usecase
}