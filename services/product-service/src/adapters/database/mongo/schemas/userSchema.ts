import mongoose, { Schema } from "mongoose";
import { IUser } from "../../../../entities/userEntities";

const UserSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Products"
        }
    ],
    favourites: [
        {
            type: Schema.Types.ObjectId,
            ref: "Products"
        },
    ]
})

const UserCollection = mongoose.model<IUser>("Users", UserSchema);

export default UserCollection;