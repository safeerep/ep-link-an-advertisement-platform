export const register_usecase = (dependencies: any) :any => {
    const {
        repositories: {
          userRepo: { createNewUser },
        },
      } = dependencies;
      console.log(`reached`);
      
    if (!createNewUser) throw new Error('repository is required')

    const interactor = (userCredentials: any) => {
        console.log(`now here`);
        return createNewUser(userCredentials)
    }

    return { interactor }
}
 
