export const unBlockASeller_usecase = ( dependencies: any) => {
    const {
        repositories: {
            userRepo
        }
    } = dependencies;

    const interactor = async ( currentUserId: string, sellerId: string) => {
        return await userRepo.unBlockASeller( currentUserId, sellerId)
    }

    return { interactor }
}