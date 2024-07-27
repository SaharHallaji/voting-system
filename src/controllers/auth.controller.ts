import {Request, Response, NextFunction} from 'express';
import {User} from '../models/user.model.ts';
import {generateToken} from '../utils/generateToken.ts';
import {comparePassword} from '../utils/passwordUtils';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body;

    if (!(username || password)) return res.status(400).json({
        statusCode: 400,
        title: "Bad request, missing or incorrect credentials",
        message: 'Enter the correct username and password!'
    })

    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).json({
                statusCode: 401,
                title: "Unauthorized, invalid username or password",
                message: 'either username or password is invalid!'
            });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                statusCode: 401,
                title: "Unauthorized, invalid username or password",
                message: 'either username or password is invalid!'
            });
        }

        const token = generateToken(user._id.toString(), user.role);

        res.status(200).json({
            statusCode: 200,
            title: "the request was successful",
            message: 'The user has logged in successfully',
            token
        });
    } catch (error) {
        next(error);
    }
};
