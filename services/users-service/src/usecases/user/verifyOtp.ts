export const verifyOtp_usecase = (dependencies: any) => {
  const {
    repositories: {
      userRepo: { verifyOtp },
    },
  } = dependencies;

  if (!verifyOtp) throw new Error("dependecy is required for verifying otp");

  const interactor = async (email: string, otp: number) => {
    return await verifyOtp(email, otp);
  };

  return { interactor };
};
