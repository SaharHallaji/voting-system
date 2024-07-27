import { NextFunction, Response } from 'express';
import { AuthRequest } from '@interfaces';

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
