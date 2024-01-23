export const upadatePassword_usecase = (dependencies: any) => {
  const {
    repositories: { adminRepo },
  } = dependencies;

  if (!adminRepo) throw new Error("dependecy is required for update password");

  const interactor = async (email: string, password: string) => {
    return await adminRepo.updatePassword(email, password);
  };

  return { interactor };
};
