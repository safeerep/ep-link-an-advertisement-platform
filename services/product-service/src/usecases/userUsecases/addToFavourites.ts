export const addToFavourites_usecase = ( dependencies: any) => {
    const {
        repositories: {
            userRepo
        }
    } = dependencies;

    const interactor = async ( userId: string, productId: string) => {
        return await userRepo.addToFavourites( userId, productId)
    }

    return { interactor }
}