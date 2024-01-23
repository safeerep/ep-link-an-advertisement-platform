export const findAdmin_usecase = (dependencies: any) => {
    const { 
        repositories: {
            adminRepo
        }
    } = dependencies;

    const interactor = async (email: string) => {
        return adminRepo.findAdminWithEmail( email)
    }

    return { interactor }
}