import { ObjectId } from "mongoose"; 

export interface ReportType {
    reportedBy: ObjectId;
    reason: string;
}

export interface IReportedProduct extends Document {
    _id: ObjectId
    productId: ObjectId;
    reports: ReportType[];
}