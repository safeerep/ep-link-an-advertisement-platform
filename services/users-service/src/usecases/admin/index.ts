import { findAdmin_usecase } from "./findAdminWithEmail";
import { findAdminWithId_usecase } from "./findAdminWithId";
import { getAllUsers_usecase } from "./getAllUsers";
import { changeUserStatus_usecase } from "./changeUserStatus";

export = {
    findAdmin_usecase,
    findAdminWithId_usecase,
    getAllUsers_usecase,
    changeUserStatus_usecase,
}