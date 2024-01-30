import { findIsChatRoomExistingWithTwoSpecificUsers_usecase } from "./findWithUsersId"
import { createANewChatroom_usecase } from "./createNewChatRoom"
import { getAllChatsOfCurrentUser_usecase } from "./getCurrentUserChats"
import { getUsersIdFromChatroom_usecase } from "./getUserIdFromChatroom"
import { makeUserOfflineInRoom_usecase } from "./makeUserOfflineInRoom"
import { makeUserOnlineInRoom_usecase } from "./makeUserOnlineInRoom"
import { checkUserOnlineStatusInARoom_usecase } from "./checkUserOnlineStatus"

export default {
    findIsChatRoomExistingWithTwoSpecificUsers_usecase,
    createANewChatroom_usecase,
    getAllChatsOfCurrentUser_usecase,
    getUsersIdFromChatroom_usecase,
    makeUserOfflineInRoom_usecase,
    makeUserOnlineInRoom_usecase,
    checkUserOnlineStatusInARoom_usecase
}