import { IUser } from "../../entities/userEntities";

export const addPremiumMember_usecase = (dependencies: any) => {
    try {
        const {
            repositories: {
                premiumMembersRepo
            }
        } = dependencies;

        if (!premiumMembersRepo) console.log(`premium members repo is not getting as we wish`);

        const interactor = async ( userDetails: IUser) => {
            return await premiumMembersRepo.saveNewMemberDetails(userDetails)
        }
        
        return { interactor }
    } catch (error) {
        console.log(`something went wrong in adding new subscriber`);
        return false;
    }
}