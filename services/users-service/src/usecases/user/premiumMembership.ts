export const givePremiumMemberShip_usecase = (dependencies: any) => {
    const {
      repositories: {
        userRepo: { updateUserToPremium },
      },
    } = dependencies;
    console.log(`here in usecase`);
    
    if (!updateUserToPremium) throw new Error("dependecy is required for it");
  
    const interactor = async (userId: string, subscriptionPolicy: string) => {
      return await updateUserToPremium(userId, subscriptionPolicy);
    };
  
    return { interactor };
  };
  