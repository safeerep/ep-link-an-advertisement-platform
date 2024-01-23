export const followUser_usecase = ( dependencies: any) => {
    const {
        repositories: {
            userRepo
        }
    } = dependencies;

    const interactor = async ( currentUserId: string, userId: string) => {
        return await userRepo.followUser(currentUserId, userId)
    }

    return { interactor }
}