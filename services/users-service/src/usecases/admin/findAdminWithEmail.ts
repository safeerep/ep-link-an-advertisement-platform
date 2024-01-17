export const findAdmin_usecase = (dependencies: any) => {
    const { 
        repositories: {
            adminRepo
        }
    } = dependencies;

    const execute = async (email: string) => {
        return adminRepo.findAdminWithEmail( email)
    }

    return { execute }
}