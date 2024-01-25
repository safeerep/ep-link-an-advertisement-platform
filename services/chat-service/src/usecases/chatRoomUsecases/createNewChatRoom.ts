export const createANewChatroom_usecase = ( dependencies: any) => {
    const {
        repositories: {
            chatRepo
        }
    } = dependencies;

    const interactor = async (users: any) => {
        return await chatRepo.createANewChatroom(users)
    }

    return { interactor }
}