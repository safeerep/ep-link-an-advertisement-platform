export const getReportedProducts_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async () => {
        return await productRepo.getReportedProducts()
    }

    return { interactor }
}