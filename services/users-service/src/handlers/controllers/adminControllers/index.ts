import adminLogin from "./adminLogin";
import adminAuthCheck from "./adminAuthCheck";
import adminLogout from "./adminLogout";
import getUsers from "./getUsers";
import changeUserStatus from "./changeUserStatus";
import adminResetPassword from "./adminResetPassword";
import changePassword from "./changePassword";
import getReportedUsers from "./getReportedUsers";


export default ( dependencies: any) => {
    return {
        adminLoginController: adminLogin(dependencies),
        adminAuthCheckController: adminAuthCheck(dependencies),
        adminLogoutController: adminLogout(),
        getUsersController: getUsers(dependencies),
        changeUserStatusController: changeUserStatus(dependencies),
        adminResetPasswordController: adminResetPassword(dependencies),
        changePasswordController: changePassword(dependencies),
        getReportedUsersController: getReportedUsers(dependencies)
    }
}