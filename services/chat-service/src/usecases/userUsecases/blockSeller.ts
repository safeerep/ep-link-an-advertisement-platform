export const blockASeller_usecase = ( dependencies: any) => {
    const {
        repositories: {
            userRepo
        }
    } = dependencies;

    const interactor = async ( currentUserId: string, sellerId: string) => {
        return await userRepo.blockASeller( currentUserId, sellerId)
    }

    return { interactor }
}