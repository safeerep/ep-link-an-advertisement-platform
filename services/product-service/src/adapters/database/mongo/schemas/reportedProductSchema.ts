import mongoose, { Schema } from "mongoose";
import { IProduct } from "../../../../entities/productEntities";

const ReportedProductSchema: Schema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "Products"
    },
    reports: [
        {
            reportedBy: {
                type: Schema.Types.ObjectId,
                required: true,
            },
            reason: {
                type: String,
                required: true,
            }
        },

    ],
});

const ReportedProductsCollection = mongoose.model<IProduct>("ReportedProducts", ReportedProductSchema);
export default ReportedProductsCollection;