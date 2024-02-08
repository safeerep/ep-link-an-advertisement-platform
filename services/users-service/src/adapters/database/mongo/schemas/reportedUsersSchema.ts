import mongoose, { Schema } from "mongoose";
import { IReportedUser } from "../../../../entities/reportedUserEntities";


const ReportedUserSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "Users"
    },
    reports: [
        {
            reportedBy: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Users"
            },
            reason: {
                type: String,
                required: true,
            }
        },

    ],
});

export default mongoose.model<IReportedUser>("reportedUsers", ReportedUserSchema);
