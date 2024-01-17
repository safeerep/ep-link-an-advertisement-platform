import mongoose, { Schema } from "mongoose";
import { IOtp } from "../../../../entities/userEntities";

const otpSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    createdOn: {
      type: Date,
      expires: "5m",
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOtp>("otp", otpSchema);

export interface IOtpDocument extends IOtp {
  createdAt: Date;
  updatedAt: Date;
}
