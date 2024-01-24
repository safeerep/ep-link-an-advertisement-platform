export const updateProfile_usecase = (dependencies: any) => {
    const {
      repositories: {
        userRepo: { updateUserProfile },
      },
    } = dependencies;
    console.log(`here in usecase`);
    
    if (!updateUserProfile) throw new Error("dependecy is required for update user profile");
  
    const interactor = async (userId: string, userDetails: any) => {
      return await updateUserProfile(userId, userDetails);
    };
  
    return { interactor };
  };
  