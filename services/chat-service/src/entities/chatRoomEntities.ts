import { Document, ObjectId } from 'mongoose';

interface IUserData {
    userId: ObjectId,
    onlineStatus: boolean
}

export interface IChatroom extends Document {
    _id: ObjectId;
    users: IUserData [];
    lastMessage: ObjectId;
}