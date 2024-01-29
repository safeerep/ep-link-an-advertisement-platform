import { findAdminWithEmail } from "./adminRepo"
import { getAdminDataFromId } from "./adminRepo"
import { getAllUsers } from "./adminRepo"
import { changeUserStatus } from "./adminRepo"
import { updatePassword } from "./adminRepo"

export default {
    findAdminWithEmail,
    getAdminDataFromId,
    getAllUsers,
    changeUserStatus,
    updatePassword,
}