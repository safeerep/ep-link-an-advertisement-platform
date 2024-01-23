export const getProducts_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async () => {
        return await productRepo.getProducts()
    }

    return { interactor }
}