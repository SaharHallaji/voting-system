import {NextFunction, Response} from 'express';
import jwt from 'jsonwebtoken';
import {AuthRequest} from "@interfaces";
const secret = process.env.JWT_SECRET;


export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    try {
        req.user = jwt.verify(token, secret) as { _id: string; username: string };
        next();
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'});
    }
};
