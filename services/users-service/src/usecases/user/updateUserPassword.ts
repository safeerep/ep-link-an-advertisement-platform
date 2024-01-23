export const upadatePassword_usecase = (dependencies: any) => {
  const {
    repositories: {
      userRepo: { updatePassword },
    },
  } = dependencies;

  if (!updatePassword) throw new Error("dependecy is required for update password");

  const interactor = async (email: string, password: string) => {
    return await updatePassword(email, password);
  };

  return { interactor };
};
