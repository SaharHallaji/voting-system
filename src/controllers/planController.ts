import {Response} from 'express';
import {Plan} from '../models/planModel.ts';
import {Types} from 'mongoose';
import {AuthRequest} from "@interfaces";

export const createPlan = async (req: AuthRequest, res: Response) => {
    const {title, description, expirationDate} = req.body;
    const userId = new Types.ObjectId(req.user._id);

    if (!title || !description || !expirationDate) {
        return res.status(400).json({message: 'Missing required fields'});
    }

    try {
        const newPlan = new Plan({
            title,
            description,
            expirationDate,
            createdBy: userId,
            votes: []
        });

        await newPlan.save();
        return res.status(201).json({message: "new plan has added to the database"});
    } catch (error) {
        return res.status(500).json({message: 'Server error', error});
    }
};
