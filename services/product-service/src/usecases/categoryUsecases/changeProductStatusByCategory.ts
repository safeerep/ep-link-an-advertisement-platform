export const changeProductsStatusByCategory_usecase = (dependencies : any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const execute = async (categoryId: string, status: boolean) => {
        return await productRepo.changeProductsStatusByCategory(categoryId, status)
    }

    return { execute }
} 