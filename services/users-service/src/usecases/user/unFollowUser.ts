export const unFollowUser_usecase = ( dependencies: any) => {
    const {
        repositories: {
            userRepo
        }
    } = dependencies;

    const execute = async ( currentUserId: string, userId: string) => {
        return await userRepo.unFollowUser(currentUserId, userId)
    }

    return { execute }
}