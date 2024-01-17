
export const isCategoryExistWithId_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const execute = async ( categoryId: string) => {
        return await categoryRepo.isCategoryExistWithId(categoryId)
    }

    return { execute }
}