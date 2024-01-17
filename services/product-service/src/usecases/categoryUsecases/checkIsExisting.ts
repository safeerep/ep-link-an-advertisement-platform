export const checkIsCategoryExisting_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const execute = async ( categoryName: string) => {
        return await categoryRepo.isCategoryExist(categoryName)
    }

    return { execute }
}