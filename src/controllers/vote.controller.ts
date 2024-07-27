import {Response} from 'express';
import {Plan} from '../models/plan.model.ts';
import {Types} from 'mongoose';
import {AuthRequest} from '@interfaces';

export const voteOnPlan = async (req: AuthRequest, res: Response) => {
    const {planId} = req.params;
    const {voteValue} = req.body;
    const userId = new Types.ObjectId(req.user._id);

    const currentDate = new Date();

    if (typeof voteValue !== 'number' || ![1, -1].includes(voteValue)) {
        return res.status(400).json({
            statusCode: 400,
            title: "Bad Request",
            message: 'Invalid vote value. It must be either 1 or -1 as a number.'
        });
    }

    if (!Types.ObjectId.isValid(planId)) {
        return res.status(400).json({
            statusCode: 400,
            title: "Bad Request",
            message: 'Invalid request details'
        });
    }

    try {
        const plan = await Plan.findById(planId)
            .populate('votes.userId', 'first_name last_name username role');
        if (!plan) {
            return res.status(404).json({
                statusCode: 404,
                title: "Not Found",
                message: 'Plan not found'
            });
        }

        if (plan.expirationDate < currentDate)
            return res.status(410).json({
                statusCode: 410,
                title: "Gone",
                message: 'Plan has expired'
            });


        const existingVote = plan.votes.findIndex(vote => vote.userId._id.toString() === userId._id.toString());

        if (existingVote !== -1) {
            plan.votes[existingVote].voteValue = voteValue;
        } else {
            plan.votes.push({
                userId,
                voteValue
            });
        }

        await plan.save();
        return res.status(200).json({
            statusCode: 200,
            title: "The request was successful",
            message: "Vote successfully recorded"
        });

    } catch (error) {
        console.error('Error in voting on plan:', error);
        return res.status(500).json({
            statusCode: 500,
            title: 'Internal Server Error',
            message: error.message
        });
    }
};

