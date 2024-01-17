export const login_usecase = (dependencies: any) => {
    
    const { repositories: { 
        userRepo
    }} = dependencies;

    if (!userRepo) throw new Error('dependency is required for login in user repository')

    const execute = async ( email: string, password: string) => {
        return await userRepo.userLogin(email, password)
    }

    return { execute }
}