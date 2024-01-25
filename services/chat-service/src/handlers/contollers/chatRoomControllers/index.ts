import getChatroom from "./getChatroom"

export default ( dependencies: any) => {
    return {
        getChatroomController: getChatroom(dependencies),
    }
}