export const checkIsReceiverBlockedSender_usecase = (dependencies: any) => {
    const {
        repositories: {
            userRepo
        }
    } = dependencies;

    const interactor = async ( receiverId: string, currentUserId: string) => {
        return await userRepo.checkIsBlockedOrNot( receiverId, currentUserId)
    }

    return { interactor }
}