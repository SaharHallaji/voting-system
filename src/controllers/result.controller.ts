import { Request, Response } from 'express';
import { Plan } from '../models/plan.model.ts';


export const getExpiredPlansResults = async (req: Request, res: Response) => {
    try {
        const currentDate = new Date();

        // find any plan which has expired.
        const expiredPlans = await Plan.find({
            expirationDate: { $lt: currentDate }
        })
            .populate('createdBy', 'first_name last_name username role')
            .populate('votes.userId', 'first_name last_name username role');

        // If there wasn't any expired plan.
        if (expiredPlans.length === 0) {
            return res.status(404).json({
                statusCode:404,
                title: "Not Found",
                message: 'No expired plans found'
            });
        }

        return res.status(200).json({
            statusCode: 200,
            title: "OK",
            message: 'Expired plans retrieved successfully',
            plans: expiredPlans
        });


    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            title: 'Internal Server Error',
            message: error.message
        });
    }
};
