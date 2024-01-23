export const getCategories_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const interactor = async () => {
        return await categoryRepo.getCategories();
    }

    return { interactor }
}