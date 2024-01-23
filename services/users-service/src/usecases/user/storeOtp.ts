export const storeOtp_usecase = (dependencies: any) => {
  const {
    repositories: {
      userRepo: { storeOtp },
    },
  } = dependencies;

  if (!storeOtp)
    throw new Error("dependecy is required for storing otp in database");

  const interactor = async (email: string, otp: number) => {
    return await storeOtp(email, otp);
  };

  return { interactor };
};
