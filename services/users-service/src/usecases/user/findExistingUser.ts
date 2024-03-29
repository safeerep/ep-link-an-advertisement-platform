export const findExistingUser_usecase = (dependencies: any) => {
  const {
    repositories: {
      userRepo: { getUserData },
    },
  } = dependencies;
  console.log(`here in usecase`);
  
  if (!getUserData) throw new Error("dependecy is required for it");

  const interactor = async (email: string) => {
    return await getUserData(email);
  };

  return { interactor };
};
