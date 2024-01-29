import { ObjectId } from "mongoose"; 

export interface ReportType {
    reportedBy: ObjectId;
    reason: string;
}

export interface IReportedUser extends Document {
    _id: ObjectId
    userId: ObjectId;
    reports: ReportType[];
}