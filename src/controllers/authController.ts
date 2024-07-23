import { Request, Response, NextFunction } from 'express';
import {User} from '../models/userModel.ts';
import { generateToken } from '../utils/generateToken.ts';
import { comparePassword } from '../utils/passwordUtils';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!(username || password)) return res.status(400).json({message: 'Enter the correct username and password!'})
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password!' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password!' });
        }

        const token = generateToken(user._id.toString(), user.role);

        res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        next(error);
    }
};
