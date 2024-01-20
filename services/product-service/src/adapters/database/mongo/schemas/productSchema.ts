import mongoose, { Schema } from "mongoose";
import { IProduct } from "../../../../entities/productEntities";

const ProductsSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  categoryName: {
    type: String
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  categoryWiseStatus: {
    type: Boolean,
    required: true,
    default: true,
  },
  soldOut: {
    type: Boolean,
    required: true,
    default: false,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  featured: {
    type: Boolean,
    required: true,
    default: false,
  },
  reportsOnProduct: [
    {
      reason: {
        type: String,
      },
      reportedBy: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  views: {
    type: Number,
  },
  inputFields: {
    type: Map,
    of: String,
    default: {},
  },
  checkBoxes: {
    type: Map,
    of: [String],
    default: {},
  },
  radioButtons: {
    type: Map,
    of: String,
    default: {},
  },
});

const Products = mongoose.model<IProduct>("Products", ProductsSchema);

export default Products;
