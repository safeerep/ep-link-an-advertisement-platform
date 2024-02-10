import { IUser } from "../../../entities/userEntities";

export default ( dependencies: any) => {
    const {
        usecases: {
            premiumMemberUsecases
        }
    } = dependencies;

    const saveMemberDetails = async ( userData: IUser) => {
        // here we will get the processed data
        // we have to save it.
        try {
            console.log('userData reached to save member details in payment-service;');
            console.log(userData);
            
            await premiumMemberUsecases.addPremiumMember_usecase(dependencies).interactor(userData)
        } catch (error) {
            console.log(`something went wrong during saving new member data in the premium members collection ${error}`);
        }
    }

    return saveMemberDetails;
}