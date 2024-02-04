import mongoose, { Schema } from 'mongoose';
import { IPremiumPlan } from '../../../../entities/premiumPlanEntities';


const PremiumPlansSchema: Schema = new Schema({
    policyDuration: {
        type: String,
        required: true,
        enum: ['annual', ' monthly'],
        unique: true
    },
    subscriptionAmount: {
        type: Number,
        required: true
    },
});

const PremiumPlansCollection = mongoose.model<IPremiumPlan>('premiumPlans', PremiumPlansSchema);

export default PremiumPlansCollection;

