export const makeUserOnlineInRoom_usecase =  ( dependencies: any) => {
    const {
        repositories: {
            chatRepo
        }
    } = dependencies;

    if (!chatRepo) console.log(`chat repo is required to make online`);
    
    const interactor = async ( currentUserId: string, currentRoomId: string) => {
        console.log(`in interactor`);  
        return await chatRepo.changeUserStatusAsOnline( currentUserId, currentRoomId)
    }

    return { interactor }
}