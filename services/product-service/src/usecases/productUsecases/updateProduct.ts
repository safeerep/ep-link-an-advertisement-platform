export const updateProduct_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async ( productId: string, productDetails: any) => {
        return await productRepo.updateProduct( productId, productDetails)
    }

    return { interactor }
}