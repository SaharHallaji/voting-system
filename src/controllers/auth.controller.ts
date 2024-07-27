import {Request, Response, NextFunction} from 'express';
import {User} from '../models/user.model.ts';
import {generateToken} from '../utils/generateToken.ts';
import {comparePassword} from '../utils/passwordUtils';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body;

    //Check if either username or password is null.
    if (!(username || password)) return res.status(400).json({
        statusCode: 400,
        title: "Bad request, missing or incorrect credentials",
        message: 'Enter the correct username and password!'
    })


    try {
        //Try to find a user by its username
        const user = await User.findOne({username});

        //Check if user is null.
        if (!user) {
            return res.status(401).json({
                statusCode: 401,
                title: "Unauthorized, invalid username or password",
                message: 'username is invalid!'
            });
        }

        // Try to compare entered password with the user's password in the database.
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                statusCode: 401,
                title: "Unauthorized, invalid username or password",
                message: 'Either username or password is invalid!'
            });
        }

        // Generating token
        const token = generateToken(user._id.toString(), user.role);

        res.status(200).json({
            statusCode: 200,
            title: "The request was successful",
            message: 'The user has logged in successfully',
            token
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            title: 'Internal Server Error',
            message: error.message
        });
    }
};
