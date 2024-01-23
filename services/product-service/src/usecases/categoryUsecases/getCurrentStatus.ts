export const getCurrentStatusOfCategory_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const interactor = async ( categoryId: string) => {
        return await categoryRepo.getCurrentStatus(categoryId)
    }

    return { interactor }
}