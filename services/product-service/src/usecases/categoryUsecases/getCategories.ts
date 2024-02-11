export const getCategories_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const interactor = async (currentPage: number) => {
        const skip = (currentPage - 1) * 10;
        const limit = 10;
        return await categoryRepo.getCategories(skip, limit);
    }

    return { interactor }
}