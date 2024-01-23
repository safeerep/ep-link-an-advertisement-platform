export const findUserWithId_usecase = (dependencies: any) => {
  const {
    repositories: {
      userRepo: { getUserDataFromId },
    },
  } = dependencies;

  if (!getUserDataFromId) throw new Error("dependecy is required for get user data from id");

  const interactor = async (userId: string) => {
    return await getUserDataFromId(userId);
  };

  return { interactor };
};
