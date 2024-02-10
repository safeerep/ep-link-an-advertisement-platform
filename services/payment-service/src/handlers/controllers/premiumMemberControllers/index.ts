import saveMemberDetails from "./saveMemberDetails";
import getPremiumMembers from "./getPremiumMembers";

export default (dependencies: any) => {
    return {
        saveMemberDetailsController: saveMemberDetails(dependencies),
        getPremiumMembersController: getPremiumMembers(dependencies)
    }
}