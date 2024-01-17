export const getSpecificCategory_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const execute = async (categoryId: string) => {
        return await categoryRepo.getCategoryById(categoryId);
    }

    return { execute }
}