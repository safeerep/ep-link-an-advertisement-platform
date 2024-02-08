export const changeProductStatus_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async (productId: string, status: boolean) => {
        return await productRepo.changeProductStatus(productId, status)
    }

    return { interactor }
}