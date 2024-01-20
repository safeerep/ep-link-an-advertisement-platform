export const updateProduct_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const execute = async ( productId: string, productDetails: any) => {
        return await productRepo.updateProduct( productId, productDetails)
    }

    return { execute }
}