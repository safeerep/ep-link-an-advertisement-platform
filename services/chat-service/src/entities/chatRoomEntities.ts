import { Document, ObjectId } from 'mongoose';

export interface IChatroom extends Document {
    _id: ObjectId;
    users: ObjectId[];
    lastMessage: ObjectId;
}