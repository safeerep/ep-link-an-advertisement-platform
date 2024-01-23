export const getOneSpecificProduct_usecase = ( dependencies: any) => {

    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async ( productId: string) => {
        return await productRepo.getProductDetails(productId)
    }

    return { interactor }
}