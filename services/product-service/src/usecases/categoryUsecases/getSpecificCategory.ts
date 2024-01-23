export const getSpecificCategory_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const interactor = async (categoryId: string) => {
        return await categoryRepo.getCategoryById(categoryId);
    }

    return { interactor }
}