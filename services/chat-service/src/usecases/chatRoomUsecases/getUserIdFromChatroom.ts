export const getUsersIdFromChatroom_usecase = (dependencies: any) => {
    const {
        repositories: {
            chatRepo
        }
    } = dependencies;

    const interactor = async ( chatRoomId: string) => {
        return await chatRepo.getUsersId( chatRoomId)
    }

    return { interactor }
}