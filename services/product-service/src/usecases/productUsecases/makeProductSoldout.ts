export const makeProductAsSoldout_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async (productId: string) => {
        return await productRepo.makeProductAsSoldOut(productId)
    }

    return { interactor }
}