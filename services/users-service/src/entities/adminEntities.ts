import { ObjectId } from "mongoose";

export interface IAdmin extends Document {
  _id: ObjectId;
  email: String;
  password: String;
}
