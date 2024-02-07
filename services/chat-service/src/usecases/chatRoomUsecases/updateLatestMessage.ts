export const updateLatestMessage_usecase = ( dependencies: any) => {
    const {
        repositories: {
            chatRepo
        }
    } = dependencies;

    const interactor = async ( chatRoomId: string, latestMessage: string) => {        
        return await chatRepo.updateLatestMessage( chatRoomId, latestMessage)
    }

    return { interactor }
}