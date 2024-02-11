import { ObjectId, Document } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  userId: ObjectId;
  products?: ObjectId[];
  favourites?: ObjectId[];
}