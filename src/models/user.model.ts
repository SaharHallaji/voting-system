import { Schema, model, Document } from 'mongoose';

// Interface for User Document
export interface UserInterface extends Document {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    role: 'manager' | 'user';
}

// User Schema
const userSchema = new Schema<UserInterface>({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['manager', 'user'], required: true }
}, { timestamps: true });

export const User = model<UserInterface>('User', userSchema);
