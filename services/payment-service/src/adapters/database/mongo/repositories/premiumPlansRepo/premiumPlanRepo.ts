import { PremiumPlansCollection } from "../../schemas";
import { IPremiumPlan } from "../../../../../entities/premiumPlanEntities";

export const updatePremiumPlan =
    async (premiumPlanDetails: IPremiumPlan):Promise<IPremiumPlan | boolean> => {
        try {
            const updatedPolicy = await PremiumPlansCollection.findOneAndUpdate(
                {
                    policyDuration: premiumPlanDetails.policyDuration
                },
                {
                    ...premiumPlanDetails
                },
                {
                    upsert: true,
                    new: true
                }
            )
            return updatedPolicy as IPremiumPlan;
        } catch (error) {
            console.log(`something went wrong during updating premium plan ${error}`);
            return false;
        }
    }

export const getAllPolicies =  async () => {
    try {
        const policies = await PremiumPlansCollection.find()
        return policies;
    } catch (error) {
        console.log(`something went wrong in premium plans repo, during fetching all plans ${error}`);
        return false;
    }
}