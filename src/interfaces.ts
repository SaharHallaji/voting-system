import {Request} from "express";

export interface AuthRequest extends Request {
    user?: {
        _id: string;
        username: string;
        [key: string]: any;
    };
}