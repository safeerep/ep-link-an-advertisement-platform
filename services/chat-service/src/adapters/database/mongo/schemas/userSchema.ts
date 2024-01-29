import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../../../entities/userEntities';

const UsersSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
    },
    blockedPersons: [
        {
            type: Schema.Types.ObjectId,
        }
    ],
    onlineStatus: {
        type: Boolean,
    }
}, {
    timestamps: true
});

const UserCollection = mongoose.model<IUser>('users', UsersSchema);

export default UserCollection;

export interface UserDocument extends IUser {
    createdAt: Date;
    updatedAt: Date;
}