import { Request, Response, NextFunction } from 'express';

//error handler to handle error 500 , server error.
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    res.status(500).json({
        statusCode: 500,
        title: 'Internal Server Error',
        message: err.message
    });
};
