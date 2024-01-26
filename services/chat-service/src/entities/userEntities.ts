import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
    _id: ObjectId;
    userId: ObjectId;
    userName: String;
}