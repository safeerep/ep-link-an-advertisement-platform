export const getCurrentStatusOfCategory_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const execute = async ( categoryId: string) => {
        return await categoryRepo.getCurrentStatus(categoryId)
    }

    return { execute }
}