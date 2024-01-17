export const getCategories_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const execute = async () => {
        return await categoryRepo.getCategories();
    }

    return { execute }
}