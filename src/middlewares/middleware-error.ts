import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/api-error';
import { ZodError } from 'zod';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;

    if (error instanceof ZodError) {
        const messages = error.issues.map(issue => `${issue.path.join('.')} must be ${issue.message.toLowerCase()}`);
        error = new ApiError(400, `Validation Failed: ${messages.join('; ')}`);
    }
    
    if (!(error instanceof ApiError)) {
        error = new ApiError(500, 'An unexpected error occurred.', false);
    }

    res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
    });
};