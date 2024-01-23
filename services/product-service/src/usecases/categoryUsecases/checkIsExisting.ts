export const checkIsCategoryExisting_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const interactor = async ( categoryName: string) => {
        return await categoryRepo.isCategoryExist(categoryName)
    }

    return { interactor }
}