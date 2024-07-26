import {Request, Response} from 'express';
import {Plan} from '../models/planModel.ts';
import {Types} from 'mongoose';

export const createPlan = async (req: Request, res: Response) => {
    const {title, description, expirationDate, userId} = req.body;

    if (!title || !description || !expirationDate || !userId) {
        return res.status(400).json({message: 'Missing required fields'});
    }

    try {
        const newPlan = new Plan({
            title,
            description,
            expirationDate,
            createdBy: new Types.ObjectId(userId),
            votes:[]
        });

        await newPlan.save();
        return res.status(201).json({message: "new plan has added to the database"});
    } catch (error) {
        return res.status(500).json({message: 'Server error', error});
    }
};
