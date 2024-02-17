import saveMessage from "./saveMessage"
import saveMediafiles from "./saveMediafiles"
import changeMessagesStatusAsRead from "./changeMessagesStatusAsRead"
import changeMessageStatusOnEvent from "./changeMessageStatusOnEvent"
import getCountOfUnreadMessages from "./getCountOfUnreadMessages"

export default ( dependencies: any) => {
    return {
        saveMessageController: saveMessage(dependencies),
        saveMediafilesController: saveMediafiles(),
        changeMessagesStatusAsReadController: changeMessagesStatusAsRead(dependencies),
        changeMessageStatusOnEventController: changeMessageStatusOnEvent(dependencies),
        getCountOfUnreadMessagesController: getCountOfUnreadMessages(dependencies) 
    }
}