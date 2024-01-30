import checkIsReceiverBlocked from "./checkIsReceiverBlocked"
import blockUser from "./blockUser"
import unBlockUser from "./unBlockUser"
import checkReceiverOnlineStatus from "./checkReceiverOnlineStatus"

export default ( dependencies: any) => {
    return {
        checkIsReceiverBlockedController: checkIsReceiverBlocked(dependencies),
        blockUserController: blockUser(dependencies),
        unBlockUserController: unBlockUser(dependencies),
        checkReceiverOnlineStatusController: checkReceiverOnlineStatus(dependencies)
    }
}