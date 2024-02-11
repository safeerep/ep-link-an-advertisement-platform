export const getAvailableProducts_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async (currentPage: number) => {
        const skip = (currentPage - 1) * 8;
        const limit = 8;
        return await productRepo.getAvailableProducts( skip, limit)
    }

    return { interactor }
}