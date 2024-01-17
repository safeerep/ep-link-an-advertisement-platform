export const getAllUsers_usecase = (dependencies: any) => {
    const {
        repositories: {
            adminRepo
        }
    } = dependencies;

    const execute = () => {
        return adminRepo.getAllUsers() 
    }

    return { execute }
}