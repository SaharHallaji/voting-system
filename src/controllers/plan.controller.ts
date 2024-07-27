import {Response} from 'express';
import {Plan} from '../models/plan.model.ts';
import {Types} from 'mongoose';
import {AuthRequest} from "@interfaces";

export const createPlan = async (req: AuthRequest, res: Response) => {
    const {title, description, expirationDate} = req.body;
    const userId = new Types.ObjectId(req.user._id);

    if (!title || !description || !expirationDate) {
        return res.status(400).json({
            statusCode: 400,
            title: "Bad request, missing or incorrect credentials",
            message: "Missing required fields: title, description, expirationDate"
        });
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
        return res.status(201).json({
            statusCode: 201,
            title: "New resources are created.",
            message: "New plan has added to the database"
        });

    } catch (error) {
        return res.status(500).json({message: 'Server error', error});
    }
};
