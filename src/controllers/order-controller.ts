import { PrismaClient } from '../../generated/prisma/client';
import { Request, Response } from 'express';
import { calculateETA } from '../utils/eta-calc-util';

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response) => {
    const { customer_id, restaurant_id, item_amount } = req.body;
    
    if (!customer_id || !restaurant_id || item_amount === undefined || item_amount <= 0) {
        return res.status(400).json({ error: 'Customer ID, Restaurant ID, and a positive Item Amount are required.' });
    }

    try {
        const estimated_eta = calculateETA(item_amount);

        const order = await prisma.order.create({
        data: {
            customer_id: parseInt(customer_id),
            restaurant_id: parseInt(restaurant_id),
            item_amount: parseInt(item_amount),
            estimated_eta: estimated_eta,
        },
        include: {
            customer: { select: { name: true } },
            restaurant: { select: { name: true } },
        },
        });

        res.status(201).json(order);
    } catch (error) {
        if ((error as any).code === 'P2003') {
            return res.status(404).json({ error: 'Customer or Restaurant not found.' });
        }
        res.status(500).json({ error: 'Failed to create order.' });
    }
    };

    export const getOrders = async (req: Request, res: Response) => {
    const { customer_id, restaurant_id } = req.query;
    let whereClause = {};

    if (customer_id) {
        whereClause = { ...whereClause, customer_id: parseInt(customer_id as string) };
    }
    if (restaurant_id) {
        whereClause = { ...whereClause, restaurant_id: parseInt(restaurant_id as string) };
    }

    try {
        const orders = await prisma.order.findMany({
        where: whereClause,
        include: {
            customer: { select: { name: true } },
            restaurant: { select: { name: true } },
        },
        orderBy: { order_time: 'desc' },
        });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders.' });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.id);

    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                customer: { select: { name: true } },
                restaurant: { select: { name: true } },
            },
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order info.' });
    }
};