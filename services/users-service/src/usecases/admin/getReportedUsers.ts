export const getReportedUsers_usecase = (dependencies: any) => {
    const {
        repositories: {
            adminRepo
        }
    } = dependencies;

    const interactor = (currentPage: number) => {
        const limit = 10;
        const skip = ( currentPage - 1) * limit;
        return adminRepo.getReportedUsers( skip, limit) 
    }

    return { interactor }
}