export const getAvailableProducts_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async () => {
        return await productRepo.getAvailableProducts()
    }

    return { interactor }
}