export const getMessagesFromOneChatroom_usecase = (dependencies: any) => {
    const {
        repositories: {
            messageRepo
        }
    } = dependencies;

    const interactor = async ( chatRoomId: string) => {
        return await messageRepo.getMessagesFromASpecificRoom(chatRoomId)
    }

    return { interactor }
}