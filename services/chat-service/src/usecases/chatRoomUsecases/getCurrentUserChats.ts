export const getAllChatsOfCurrentUser_usecase = ( dependencies: any) => {
    const {
        repositories: {
            chatRepo
        }
    } = dependencies;

    const interactor = async ( currentUserId: string) => {        
        return await chatRepo.getAllChatsOfCurrentUser(currentUserId)
    }

    return { interactor }
}