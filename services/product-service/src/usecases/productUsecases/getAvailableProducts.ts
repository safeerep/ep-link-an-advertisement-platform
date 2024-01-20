export const getAvailableProducts_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const execute = async () => {
        return await productRepo.getAvailableProducts()
    }

    return { execute }
}