import checkIsReceiverBlocked from "./checkIsReceiverBlocked"
import blockUser from "./blockUser"
import unBlockUser from "./unBlockUser"

export default ( dependencies: any) => {
    return {
        checkIsReceiverBlockedController: checkIsReceiverBlocked(dependencies),
        blockUserController: blockUser(dependencies),
        unBlockUserController: unBlockUser(dependencies)
    }
}