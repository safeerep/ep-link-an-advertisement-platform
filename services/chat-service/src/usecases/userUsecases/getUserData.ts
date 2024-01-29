export const getUserData_usecase = ( dependencies: any) => {
    const {
        repositories: {
            userRepo
        }
    } = dependencies;

    const interactor = async ( userId: string) => {
        console.log(userId);
        return await userRepo.getUserData(userId)
    }

    return { interactor }
}