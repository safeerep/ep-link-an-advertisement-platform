import { ObjectId, Document } from "mongoose";

export interface ICategory extends Document {
  _id: ObjectId;
  categoryName: String;
  status: Boolean;
  inputFields: String[] | null;
  checkBoxFields: {
    label: String | null;
    options: String[] | null;
  }[];
  radioButtonFields: {
    label: String | null;
    options: String[] | null;
  }[];
}