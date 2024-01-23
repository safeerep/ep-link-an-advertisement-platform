export const getCurrentUserProducts_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async (userId: string) => {
        return await productRepo.getCurrentUserProducts(userId)
    }

    return { interactor }
}