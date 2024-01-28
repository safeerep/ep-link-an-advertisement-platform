import mongoose, { Schema, Document, ObjectId } from "mongoose";
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
      unique: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    password: {
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
    favouriteProducts: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    blockedPersons: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    reportsOnAccount: [
      {
        reason: {
          type: String,
        },
        reportedBy: {
          type: Schema.Types.ObjectId,
        },
      },
    ],
    subscription: {
      policy: {
        type: String,
        enum: ["annual", " monthly"],
      },
      takenOn: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("Users", UsersSchema);

export interface IUserData extends IUser{
    createdAt: Date;
    updatedAt: Date;
}

