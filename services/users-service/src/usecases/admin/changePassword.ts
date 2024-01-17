export const upadatePassword_usecase = (dependencies: any) => {
  const {
    repositories: { adminRepo },
  } = dependencies;

  if (!adminRepo) throw new Error("dependecy is required for update password");

  const execute = async (email: string, password: string) => {
    return await adminRepo.updatePassword(email, password);
  };

  return { execute };
};
