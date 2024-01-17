export const changeUserStatus_usecase = (dependencies: any) => {
    const {
        repositories: {
            adminRepo
        }
    } = dependencies;

    const execute = async (userId: string) => {
        return await adminRepo.changeUserStatus(userId)
    }

    return { execute }
}