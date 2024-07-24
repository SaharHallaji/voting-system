import {Response} from 'express';
import {Plan} from '../models/planModel';
import {Types} from 'mongoose';
import {AuthRequest} from '@interfaces';

export const voteOnPlan = async (req: AuthRequest, res: Response) => {
    const {planId} = req.params;
    const {voteValue} = req.body;
    const userId = new Types.ObjectId(req.user._id);

    if (!voteValue || !Types.ObjectId.isValid(planId)) {
        return res.status(400).json({message: 'Invalid request details'});
    }

    try {
        const plan = await Plan.findById(planId);

        if (!plan) {
            return res.status(404).json({message: 'Plan not found'});
        }

        const existingVote = plan.votes.find(vote => vote.userId.toString() === userId.toString());

        if (existingVote) {
            existingVote.voteValue = voteValue;
        } else {
            plan.votes.push({
                userId,
                username: req.user.username,
                voteValue
            });
        }

        await plan.save();
        return res.status(200).json({
            message: 'Vote successfully recorded',
            plan
        });
    } catch (error) {
        console.error('Error in voting on plan:', error);
        return res.status(500).json({message: 'Server error', error});
    }
};

