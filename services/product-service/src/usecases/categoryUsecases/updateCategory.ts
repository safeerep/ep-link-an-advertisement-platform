export const updateCategoryDetails_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const interactor = async ( categoryId: string, categoryDetails: any) => {
        return await categoryRepo.updateCategoryDetails(categoryId, categoryDetails)
    }

    return { interactor }
}