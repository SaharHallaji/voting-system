import { NextFunction, Response } from 'express';
import { AuthRequest } from '@interfaces';

// A middle ware to handle the role-based access control
export const checkRole = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                statusCode: 403,
                title: 'Forbidden',
                message: 'Access denied'
            });
        }
        next();
    };
};
