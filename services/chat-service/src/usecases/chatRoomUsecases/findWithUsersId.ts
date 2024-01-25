export const findIsChatRoomExistingWithTwoSpecificUsers_usecase =  ( dependencies: any) => {
        const {
            repositories: {
                chatRepo
            }
        } = dependencies;

        if (!chatRepo) console.log(`chat repo is required to get room`);
        
        const interactor = async ( currentUserId: string, sellerId: string) => {
            console.log(`in interactor`);  
            return await chatRepo.findIsChatRoomExistingWithTwoSpecificUsers( currentUserId, sellerId)
        }

        return { interactor }
}

