import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const generateToken = (userId: string, role: string) => {
    return jwt.sign({ userId, role }, SECRET_KEY, { expiresIn: '1h' });
};
