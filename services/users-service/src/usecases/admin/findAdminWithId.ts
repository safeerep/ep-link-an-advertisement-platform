export const findAdminWithId_usecase = (dependencies: any) => {
    const {
      repositories: {
        adminRepo: { getAdminDataFromId },
      },
    } = dependencies;
  
    console.log(dependencies);
    
    if (!getAdminDataFromId) throw new Error("dependecy is required for get find admin with id");
  
    const execute = async (adminId: string) => {
      return await getAdminDataFromId(adminId);
    };
  
    return { execute };
  };
  