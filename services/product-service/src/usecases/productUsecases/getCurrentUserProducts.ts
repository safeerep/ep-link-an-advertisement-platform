export const getCurrentUserProducts_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async (userId: string, currentPage: number) => {
        const limit = 8;
        const skip = ( currentPage - 1) * 8;
        return await productRepo.getCurrentUserProducts(userId, skip, limit)
    }

    return { interactor }
}