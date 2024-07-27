import {NextFunction, Response} from 'express';
import jwt from 'jsonwebtoken';
import {AuthRequest} from "@interfaces";

const secret = process.env.JWT_SECRET;

// A middleware for checking if user has logged in or not, then extract user id and user role from then token.
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    // check if the token is null.
    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            title: "Unauthorized",
            message: "No token provided"
        });
    }

    // try to extract userId and role form the token and put it in req.user to be able to access the values in controllers.
    try {
        const decoded = jwt.verify(token, secret) as { userId: string; role: string };
        req.user = {
            _id: decoded.userId,
            role: decoded.role
        };
        next();
    } catch (error) {
        return res.status(401).json({
            statusCode: 401,
            title: "Unauthorized",
            message: 'Invalid token'
        });
    }
};
