import mongoose, {Schema, Document} from 'mongoose';

interface Vote {
    userId: mongoose.Types.ObjectId;
    voteValue: number;
}

interface PlanInterface extends Document {
    title: string;
    description: string;
    expirationDate: Date;
    createdBy: mongoose.Schema.Types.ObjectId;
    votes: Vote[];
}

const planSchema = new Schema<PlanInterface>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    expirationDate: {type: Date, required: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    votes: [{
        userId: {type: Schema.Types.ObjectId, ref: 'User'},
        voteValue: {type: Number}
    }]
}, {timestamps: true});

export const Plan = mongoose.model<PlanInterface>('Plan', planSchema);


