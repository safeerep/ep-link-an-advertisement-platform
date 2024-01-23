export const getActiveCategories_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const interactor = async () => {
        return await categoryRepo.getActiveCategories();
    }

    return { interactor }
}