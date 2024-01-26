import getChatroom from "./getChatroom"
import getCurrentUserChatRooms from "./getCurrentUserChatRooms"

export default ( dependencies: any) => {
    return {
        getChatroomController: getChatroom(dependencies),
        getCurrentUserChatRoomsController: getCurrentUserChatRooms(dependencies)
    }
}