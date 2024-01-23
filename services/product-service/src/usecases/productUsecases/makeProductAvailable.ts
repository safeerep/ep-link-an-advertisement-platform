export const makeProductAsAvailable_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async (productId: string) => {
        return await productRepo.makeProductAsAvailable(productId)
    }

    return { interactor }
}