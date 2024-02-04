import updatePremiumPlan from "./updatePremiumPlan";
import getAllPlanDetails from "./getAllPlanDetails";

export default (dependencies: any) => {
    return {
        updatePremiumPlanController: updatePremiumPlan(dependencies),
        getAllPlanDetailsController: getAllPlanDetails(dependencies)
    }
}