import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/order-service';
import * as validation from '../validations/order-validation';

const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const createOrder = catchAsync(async (req: Request, res: Response) => {
    const rawData = {
        customer_id: parseInt(req.body.customer_id),
        restaurant_id: parseInt(req.body.restaurant_id),
        item_amount: parseInt(req.body.item_amount),
    };
    
    const data = validation.createOrderSchema.parse(rawData);
    const order = await orderService.create(data);
    res.status(201).json(order);
});

export const getOrders = catchAsync(async (req: Request, res: Response) => {
    const query = validation.filterOrderSchema.parse(req.query);

    const customerId = query.customer_id as number | undefined; 
    const restaurantId = query.restaurant_id as number | undefined; 

    const orders = await orderService.findAll(customerId, restaurantId);
    res.json(orders);
});

export const getOrderById = catchAsync(async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.id);
    const order = await orderService.findById(orderId);
    res.json(order);
});