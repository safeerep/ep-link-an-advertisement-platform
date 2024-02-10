import { ObjectId, Document } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  userName: String;
  profilePhoto: String | null;
  email: String;
  status: Boolean;
  premiumMember: Boolean;
  subscription: {
    policy: String | null;
    takenOn: Date | null;
  };
  subscriptionAmount: Number;
}
