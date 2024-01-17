export const addProduct_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const execute = async (productDetails: any) => {
        return await productRepo.addProduct(productDetails)
    }

    return { execute }
}