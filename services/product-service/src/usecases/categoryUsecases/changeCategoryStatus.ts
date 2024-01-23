export const changeCategoryStatus_usecase = ( dependencies: any ) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const interactor = async (categoryId: string, status: boolean) => {
        return await categoryRepo.changeCategoryStatus(categoryId, status);
    }

    return { interactor }
}