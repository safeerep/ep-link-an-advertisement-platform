import mongoose, { Schema } from "mongoose";
import { IUser } from "../../../../entities/userEntities";

const UsersSchema: Schema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: "https://usersimagebucketformain.s3.ap-south-1.amazonaws.com/1706418311720-208998111.jpg"
    },
    status: {
      type: Boolean,
      required: true,
      default: true
    },
    premiumMember: {
      type: Boolean,
      required: true,
      default: false
    },
    subscription: {
      policy: {
        type: String,
        enum: ["annual", " monthly"],
      },
      takenOn: {
        type: Date,
      },
    },
    subscriptionAmount: {
        type: Number
    }
  },
  {
    timestamps: true,
  }
);

const PremiumMembersCollection = mongoose.model<IUser>("Users", UsersSchema);

export default PremiumMembersCollection;
export interface IUserData extends IUser{
    createdAt: Date;
    updatedAt: Date;
}