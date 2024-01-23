
export const isCategoryExistWithId_usecase = ( dependencies: any) => {
    const {
        repositories: {
            categoryRepo
        }
    } = dependencies;

    const interactor = async ( categoryId: string) => {
        return await categoryRepo.isCategoryExistWithId(categoryId)
    }

    return { interactor }
}