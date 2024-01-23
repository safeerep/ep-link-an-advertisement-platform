export const addProduct_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async (productDetails: any) => {
        return await productRepo.addProduct(productDetails)
    }

    return { interactor }
}