export const changeMessageStatusAsRead_usecase = (dependencies: any) => {
    const {
        repositories: {
            messageRepo
        }
    } = dependencies;

    const interactor = async ( currentUserId: string, chatRoomId: string) => {
        return await messageRepo.makeMessageStatusAsRead( currentUserId, chatRoomId)
    }

    return { interactor }
}