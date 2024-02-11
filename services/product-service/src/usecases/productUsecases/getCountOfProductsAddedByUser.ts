export const getCurrentUserProductsCount_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async (userId: string) => {
        return await productRepo.getCurrentUserProductsCount(userId)
    }

    return { interactor }
}