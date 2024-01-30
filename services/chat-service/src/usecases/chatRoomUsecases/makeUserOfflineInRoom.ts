export const makeUserOfflineInRoom_usecase =  ( dependencies: any) => {
    const {
        repositories: {
            chatRepo
        }
    } = dependencies;

    if (!chatRepo) console.log(`chat repo is required to get room`);
    
    const interactor = async ( currentUserId: string, currentRoomId: string) => {
        console.log(`in interactor`);  
        return await chatRepo.changeUserStatusAsOffline( currentUserId, currentRoomId)
    }

    return { interactor }
}