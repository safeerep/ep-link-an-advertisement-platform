export const getProducts_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async ( currentPage: number) => {
        const limit = 10;
        const skip = (currentPage - 1) * limit;
        return await productRepo.getProducts( skip, limit)
    }

    return { interactor }
}