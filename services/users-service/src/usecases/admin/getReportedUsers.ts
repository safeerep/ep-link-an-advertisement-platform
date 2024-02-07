export const getReportedUsers_usecase = (dependencies: any) => {
    const {
        repositories: {
            adminRepo
        }
    } = dependencies;

    const interactor = () => {
        return adminRepo.getReportedUsers() 
    }

    return { interactor }
}