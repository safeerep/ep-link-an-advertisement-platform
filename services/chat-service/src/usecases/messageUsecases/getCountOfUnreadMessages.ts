export const getCountOfUnreadMessages_usecase = (dependencies: any) => {
    const {
        repositories: {
            messageRepo
        }
    } = dependencies;

    const interactor = async ( currentUserId: string, chatRoomsId: string[]) => {
        return await messageRepo.getCountOfAllUnreadMessages( currentUserId, chatRoomsId)
    }

    return { interactor }
}