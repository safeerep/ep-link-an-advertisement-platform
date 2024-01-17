import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IAdmin } from "../../../../entities/adminEntities";


const AdminSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IAdmin>("Admins", AdminSchema);
