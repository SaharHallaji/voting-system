import jwt from 'jsonwebtoken';
import dotenv from "dotenv";


dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET

export const generateToken = (userId: string, role: string) => {
    return jwt.sign({ userId, role }, SECRET_KEY, { expiresIn: '1h' });
};
