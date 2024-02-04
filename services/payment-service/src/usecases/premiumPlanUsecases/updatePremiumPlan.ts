import { IPremiumPlan } from "../../entities/premiumPlanEntities";

export const updatePremiumPlan_usecase = (dependencies: any) => {
    try {
        const {
            repositories: {
                premiumPlansRepo
            }
        } = dependencies;

        if (!premiumPlansRepo) console.log(`premium plans repo is not getting as we wish`);

        const interactor = async ( premiumPlanDetails: IPremiumPlan) => {
            return await premiumPlansRepo.updatePremiumPlan(premiumPlanDetails)
        }
        
        return { interactor }
    } catch (error) {
        console.log(`something went wrong in premium plan updating usecase`);
        return false;
    }
}