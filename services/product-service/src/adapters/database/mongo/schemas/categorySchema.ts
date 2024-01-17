import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { ICategory } from "../../../../entities/categoryEntities";

const CategoriesSchema: Schema = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  checkBoxFields: [
    {
      label: {
        type: String,
      },
      options: [
        {
          type: String,
        },
      ],
    },
  ],
  inputFields: [
    {
      type: String,
    },
  ],
  radioButtonFields: [
    {
      label: {
        type: String,
      },
      options: [
        {
          type: String,
        },
      ],
    },
  ],
});

const Categories = mongoose.model<ICategory>("Categories", CategoriesSchema);

export default Categories;