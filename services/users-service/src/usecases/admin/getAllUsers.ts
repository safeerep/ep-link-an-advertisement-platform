export const getAllUsers_usecase = (dependencies: any) => {
    const {
        repositories: {
            adminRepo
        }
    } = dependencies;

    const interactor = () => {
        return adminRepo.getAllUsers() 
    }

    return { interactor }
}