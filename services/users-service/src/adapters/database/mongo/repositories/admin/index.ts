import { findAdminWithEmail } from "./adminRepo"
import { getAdminDataFromId } from "./adminRepo"
import { getAllUsers } from "./adminRepo"
import { changeUserStatus } from "./adminRepo"
import { updatePassword } from "./adminRepo"

export = {
    findAdminWithEmail,
    getAdminDataFromId,
    getAllUsers,
    changeUserStatus,
    updatePassword,
}