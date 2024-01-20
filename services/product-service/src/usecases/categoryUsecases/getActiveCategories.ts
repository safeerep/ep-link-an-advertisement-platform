export const getActiveCategories_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const execute = async () => {
        return await categoryRepo.getActiveCategories();
    }

    return { execute }
}