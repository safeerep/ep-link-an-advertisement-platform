import { ObjectId, Document } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  userName: String;
  password: String;
  phone: Number;
  profilePhoto: String | null;
  email: String;
  status: Boolean;
  premiumMember: Boolean;
  favouriteProducts: ObjectId[] | null;
  followers: ObjectId[] | null;
  following: ObjectId[] | null;
  blockedPersons: ObjectId[] | null;
  reportsOnAccount: {
    reason: String | null;
    reportedBy: ObjectId | null;
  }[];
  subscription: {
    policy: String | null;
    takenOn: Date | null;
  };
}


export interface IOtp extends Document {
  _id: ObjectId;
  email: String;
  otp: Number;
  createdOn: Date;
}