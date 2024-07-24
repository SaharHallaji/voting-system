import { Request, Response } from 'express';
import { Plan } from '../models/planModel';


export const getExpiredPlansResults = async (req: Request, res: Response) => {
    try {
        const currentDate = new Date();

        const expiredPlans = await Plan.find({
            expirationDate: { $lt: currentDate }
        });

        if (expiredPlans.length === 0) {
            return res.status(404).json({ message: 'No expired plans found' });
        }

        return res.status(200).json({
            message: 'Expired plans retrieved successfully',
            plans: expiredPlans
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
