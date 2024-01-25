export const getMessagesFromOneChatroom_usecase = (dependencies: any) => {
    const {
        repositories: {
            messageRepo
        }
    } = dependencies;

    const interactor = async ( chatroomId: string) => {
        return await messageRepo.getMessagesFromASpecificRoom(chatroomId)
    }

    return { interactor }
}