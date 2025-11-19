import { Request, Response, NextFunction } from 'express';
import * as customerService from '../services/customer-service';
import * as validation from '../validations/customer-validation';

const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const createCustomer = catchAsync(async (req: Request, res: Response) => {
    const data = validation.createCustomerSchema.parse(req.body);
    const customer = await customerService.create(data);
    res.status(201).json(customer);
});

export const getCustomers = catchAsync(async (req: Request, res: Response) => {
    const customers = await customerService.findAll();
    res.json(customers);
});

export const getCustomerById = catchAsync(async (req: Request, res: Response) => {
    const customerId = parseInt(req.params.id);
    const customer = await customerService.findById(customerId);
    res.json(customer);
});

export const updateCustomer = catchAsync(async (req: Request, res: Response) => {
    const customerId = parseInt(req.params.id);
    const data = validation.updateCustomerSchema.parse(req.body);
    const updatedCustomer = await customerService.update(customerId, data);
    res.json(updatedCustomer);
});

export const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
    const customerId = parseInt(req.params.id);
    await customerService.remove(customerId);
    res.status(204).send();
});