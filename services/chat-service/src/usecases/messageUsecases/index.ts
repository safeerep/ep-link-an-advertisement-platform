import { getMessagesFromOneChatroom_usecase } from "./getMessagesFromOneChatRoom"
import { saveNewMessage_usecase } from "./saveNewMessage"
import { getUnreadMessageCounts_usecase } from "./getUnreadMessageCounts"
import { changeMessageStatusAsRead_usecase } from "./changeMessageStatus"

export default {
    getMessagesFromOneChatroom_usecase,
    saveNewMessage_usecase,
    getUnreadMessageCounts_usecase,
    changeMessageStatusAsRead_usecase
}