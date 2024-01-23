export const unFollowUser_usecase = ( dependencies: any) => {
    const {
        repositories: {
            userRepo
        }
    } = dependencies;

    const interactor = async ( currentUserId: string, userId: string) => {
        return await userRepo.unFollowUser(currentUserId, userId)
    }

    return { interactor }
}