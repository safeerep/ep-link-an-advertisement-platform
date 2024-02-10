import { IUser } from "../../../../../entities/userEntities";
import { PremiumMembersCollection } from "../../schemas";

export const saveNewMemberDetails = async ( userDetails: IUser) => {
    try {
        await PremiumMembersCollection.findOneAndUpdate(
            {
                _id: userDetails?._id
            }, {
                ...userDetails
            },
            {
                upsert: true,
                new: true
            }
        )
        console.log(`successfully saved user data`);
        
    } catch (error) {
        console.log(`something went wrong during creating new member details ${error}`);
        return false;
    }
}

export const getPremiumMembersList = async (skip: number, limit: number) => {
    try {
        const subscribers = await PremiumMembersCollection.find().skip(skip).limit(limit)
        const countOfSubscribers = await PremiumMembersCollection.countDocuments()
        if (subscribers) {
            return { subscribers, countOfSubscribers};
        }
        return false;
    } catch (error) {
        console.log(`something went wrong during fetching the details of premium users from premium members collection ${error}`);
        return false;
    }
}