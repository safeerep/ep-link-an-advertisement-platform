export const findUserWithPhone_usecase = (dependencies: any) => {
    const {
      repositories: {
        userRepo: { getUserWithPhone },
      },
    } = dependencies;
    console.log(`here in usecase`);
    
    if (!getUserWithPhone) throw new Error("dependecy is required for it");
  
    const execute = async (phone: number) => {
      return await getUserWithPhone(phone);
    };
  
    return { execute };
  };
  