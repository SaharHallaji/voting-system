import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET

// Generate token based on userId and role.
export const generateToken = (userId: string, role: string) => {
    return jwt.sign({userId, role}, SECRET_KEY, {expiresIn: '1h'});
};
