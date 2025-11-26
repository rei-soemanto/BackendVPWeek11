import { Request, Response, NextFunction } from 'express';
import * as seederService from '../services/seeder-service';

const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const createSeeder = catchAsync(async (req: Request, res: Response) => {
    const customer = await seederService.create();
    res.status(201).json(customer);
});