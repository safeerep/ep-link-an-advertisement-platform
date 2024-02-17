import { getMessagesFromOneChatroom_usecase } from "./getMessagesFromOneChatRoom"
import { saveNewMessage_usecase } from "./saveNewMessage"
import { getUnreadMessageCounts_usecase } from "./getUnreadMessageCounts"
import { changeMessageStatusAsRead_usecase } from "./changeMessageStatus"
import { getCountOfUnreadMessages_usecase } from "./getCountOfUnreadMessages"

export default {
    getMessagesFromOneChatroom_usecase,
    saveNewMessage_usecase,
    getUnreadMessageCounts_usecase,
    changeMessageStatusAsRead_usecase,
    getCountOfUnreadMessages_usecase
}