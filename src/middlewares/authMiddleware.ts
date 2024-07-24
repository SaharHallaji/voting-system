import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET

interface AuthRequest extends Request {
    user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    try {
        req.user = jwt.verify(token, secret);
        next();
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'});
    }
};
