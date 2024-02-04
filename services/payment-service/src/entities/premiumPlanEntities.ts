import { Document, ObjectId } from 'mongoose';

export interface IPremiumPlan extends Document {
    _id?: ObjectId;
    policyDuration: String;
    subscriptionAmount: Number;
}
