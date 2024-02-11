export const getAllFavourites_usecase = ( dependencies: any) => {
    const {
        repositories: {
            userRepo
        }
    } = dependencies;

    const interactor = async ( userId: string) => {
        return await userRepo.getAllFavourites( userId)
    }

    return { interactor }
}