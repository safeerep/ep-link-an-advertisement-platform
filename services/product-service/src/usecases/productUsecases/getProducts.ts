export const getProducts_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const execute = async () => {
        return await productRepo.getProducts()
    }

    return { execute }
}