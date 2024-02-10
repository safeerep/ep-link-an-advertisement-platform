export const removeFromFavourites_usecase = ( dependencies: any) => {
    const {
        repositories: {
            userRepo
        }
    } = dependencies;

    const interactor = async ( userId: string, productId: string) => {
        return await userRepo.removeFromFavourites( userId, productId)
    }

    return { interactor }
}