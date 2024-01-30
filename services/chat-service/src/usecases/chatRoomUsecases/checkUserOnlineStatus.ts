export const checkUserOnlineStatusInARoom_usecase = ( dependencies: any) => {
    const {
        repositories: {
            chatRepo
        }
    } = dependencies;

    const interactor = async (chatRoomId: string, userId: string) => {
        return await chatRepo.checkUserStatusInRoom( chatRoomId, userId)
    }

    return { interactor }
}