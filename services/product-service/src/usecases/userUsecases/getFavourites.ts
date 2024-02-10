export const getFavourites_usecase = ( dependencies: any) => {
    const {
        repositories: {
            userRepo
        }
    } = dependencies;

    const interactor = async ( userId: string, currentPage: number) => {
        const skip: number = ( currentPage - 1) * 8;
        const limit: number = 8;
        return await userRepo.getFavourites( userId, skip, limit)
    }

    return { interactor }
}