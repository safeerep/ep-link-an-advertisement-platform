import mongoose from "mongoose";
import { IUser } from "../../../../../entities/userEntities";
import { UserCollection, UserDocument } from "../../schemas";

// its we are using to create new user on creating new chatroom;
// and also for updating user info on getting into chatroom;
export const updateUser = async (userId: string, userData: any):Promise<UserDocument | boolean> => {
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
