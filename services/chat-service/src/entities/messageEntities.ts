import { Document, ObjectId } from 'mongoose';

export interface IMessages extends Document {
    _id?: ObjectId;
    senderId: ObjectId;
    chatRoomId: ObjectId;
    typeOfMessage: String;
    message: String;
    showToSender?: Boolean;
    showToReceiver?: Boolean;
}