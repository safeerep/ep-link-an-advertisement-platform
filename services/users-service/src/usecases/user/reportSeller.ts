import { ReportType } from "../../entities/reportedUserEntities";

export const reportSeller_usecase = (dependencies: any) => {
    const {
      repositories: {
        userRepo: { reportSeller },
      },
    } = dependencies;
    console.log(`here in usecase`);
    
    if (!reportSeller) throw new Error("dependecy is required for it");
  
    const interactor = async (sellerId: string, report: ReportType) => {
      return await reportSeller( sellerId, report);
    };
  
    return { interactor };
};
  