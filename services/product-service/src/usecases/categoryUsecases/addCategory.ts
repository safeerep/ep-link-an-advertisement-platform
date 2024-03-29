export const addNewCategory_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    if (!categoryRepo) throw new Error('category repo is not available to add category')

    const interactor = async ( categoryDetails: any) => {
        return await categoryRepo.addCategory(categoryDetails)
    }
    
    return { interactor };
}