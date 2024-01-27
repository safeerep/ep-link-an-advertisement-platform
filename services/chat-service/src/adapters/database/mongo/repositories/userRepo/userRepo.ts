import { IUser } from "../../../../../entities/userEntities";
import { UserCollection, UserDocument } from "../../schemas";

// its we are using to create new user on creating new chatroom;
// and also for updating user info on getting into chatroom;
export const updateUser = async (userId: string, userData: IUser):Promise<UserDocument | boolean> => {
    console.log(`in repo`, userData);
    
    try {
        const updatedUser = await UserCollection.findOneAndUpdate(
            {
                userId: userId
            },
            {
             ...userData
            },
            {
                upsert: true,
                new: true
            }
        )
        console.log(updatedUser);
        
        if (!updatedUser) return false;
        else return updatedUser as UserDocument;
    } catch (error) {
        console.log(`an error happened during updating user data ${error}`);
        return false;
    }
}

export const blockASeller = async ( currentUserId: string, sellerId: string):Promise<UserDocument | boolean> => {
    try {
        const updatedCurrentUserDocument = await UserCollection.findOneAndUpdate( 
            {
                userId: currentUserId
            }, {
                $addToSet: {
                    blockedPersons: sellerId
                }
            },
            {
                new: true
            }
        )
        if (!updatedCurrentUserDocument) return false;
        return updatedCurrentUserDocument as UserDocument;
    } catch (error) {
        console.log(`something went wrong during blocking seller ${error}`);     
        return false;
    }
}

export const unBlockASeller = async ( currentUserId: string, sellerId: string):Promise<UserDocument | boolean> => {
    try {
        const updatedCurrentUserDocument = await UserCollection.findOneAndUpdate( 
            {
                userId: currentUserId
            }, {
                $pull: {
                    blockedPersons: sellerId
                }
            },
            {
                new: true
            }
        )
        if (!updatedCurrentUserDocument) return false;
        return updatedCurrentUserDocument as UserDocument;
    } catch (error) {
        console.log(`something went wrong during unblocking seller ${error}`);     
        return false;
    }
}

export const checkIsBlockedOrNot = async ( receiverId: string, currentUserId: string ):Promise<boolean> => {
    try {
        const receiverData = await UserCollection.findOne({ 
            userId: receiverId, 
            blockedPersons: {
                $in: [currentUserId]
            }
        })
        if (receiverData) return true;
        return false;
    } catch (error) {
        console.log(`something went wrong in userrepo during checking is blocked or not`);
        // here we are sending true 
        // bcz if there happened any errors, we don't want to do further actions;
        return true;
    }
}
