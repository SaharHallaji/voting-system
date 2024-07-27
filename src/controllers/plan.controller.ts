import {Response} from 'express';
import {Plan} from '../models/plan.model.ts';
import {Types} from 'mongoose';
import {AuthRequest} from "@interfaces";

export const createPlan = async (req: AuthRequest, res: Response) => {
    const {title, description, expirationDate} = req.body;
    const userId = new Types.ObjectId(req.user._id);

    // check if the required fields are null.
    if (!title || !description || !expirationDate) {
        return res.status(400).json({
            statusCode: 400,
            title: "Bad request, missing or incorrect credentials",
            message: "Missing required fields: title, description, expirationDate"
        });
    }

    // Check if the date string matches the regex
    const iso8601Regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{3})?Z?$/;

    const dateMatches = iso8601Regex.test(expirationDate)

    if (!dateMatches) {
        return res.status(403).json({
            statusCode: 403,
            title: "Invalid format",
            message: "date format should match ISO 8601 date format. example : 2020-12-31T23:59:59.000Z"
        })
    }


    try {
        // Make an object to add a new plan with the entered data
        const newPlan = new Plan({
            title,
            description,
            expirationDate,
            createdBy: userId,
            votes: []
        });

        // Save the new plan in database.
        await newPlan.save();

        return res.status(201).json({
            statusCode: 201,
            title: "New resources are created.",
            message: "New plan has added to the database"
        });

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            title: 'Internal Server Error',
            message: error.message
        });
    }
};
