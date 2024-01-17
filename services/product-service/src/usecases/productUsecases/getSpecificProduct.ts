export const getOneSpecificProduct_usecase = ( dependencies: any) => {

    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const execute = async ( productId: string) => {
        return await productRepo.getProductDetails(productId)
    }

    return { execute }
}