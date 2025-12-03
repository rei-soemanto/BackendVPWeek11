import { Request, Response, NextFunction } from 'express';
import * as seederService from '../services/seeder-service';
import { catchAsync } from '../utils/async-util';

export const createSeeder = catchAsync(async (req: Request, res: Response) => {
    const customer = await seederService.create();
    res.status(201).json(customer);
});