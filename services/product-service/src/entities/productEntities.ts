import { Document, ObjectId } from 'mongoose';

export interface IProduct extends Document {
  _id: ObjectId;
  userId: ObjectId;
  productName: string;
  description: string;
  price: number;
  category: ObjectId;
  categoryName: string | null;
  status: boolean;
  categoryWiseStatus: boolean;
  images: string[];
  featured: boolean;
  reportsOnProduct: {
    reason: string | null;
    reportedBy: ObjectId | null;
  }[];
  views: number | null;
  inputFields: Record<string, string>;
  checkBoxes: Record<string, string[]>;
  radioButtons: Record<string, string>; 
}
