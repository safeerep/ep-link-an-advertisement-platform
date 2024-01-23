export const changeProductsStatusByCategory_usecase = (dependencies : any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async (categoryId: string, status: boolean) => {
        return await productRepo.changeProductsStatusByCategory(categoryId, status)
    }

    return { interactor }
} 