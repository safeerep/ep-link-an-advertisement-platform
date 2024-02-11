export const getReportedProducts_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async (currentPage: number) => {
        const limit = 10;
        const skip = ( currentPage - 1) * limit;
        return await productRepo.getReportedProducts( skip, limit)
    }

    return { interactor }
}