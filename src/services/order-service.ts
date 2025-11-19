import { ApiError } from '../errors/error-api';
import { prismaClient } from '../utils/database-util';
import { calculateETA } from '../utils/eta-calc-util';
import { Order, OrderCreateInput } from '../models/order-model';

const prisma = prismaClient;

export const create = async (data: OrderCreateInput): Promise<Order> => {
    const { item_amount, customer_id, restaurant_id } = data;

    const estimated_eta = calculateETA(item_amount);

    try {
        const order = await prisma.order.create({
            data: {
                customer_id,
                restaurant_id,
                item_amount,
                estimated_eta,
            },
            include: {
                customer: { select: { name: true } },
                restaurant: { select: { name: true } },
            },
        });
        return order as Order;
    } catch (error) {
        if ((error as any).code === 'P2003') {
            throw new ApiError(404, 'Customer or Restaurant ID does not exist.');
        }
        throw error;
    }
};

export const findAll = async (customerId?: number, restaurantId?: number): Promise<Order[]> => {
    let whereClause: any = {};

    if (customerId) {
        whereClause.customer_id = customerId;
    }
    if (restaurantId) {
        whereClause.restaurant_id = restaurantId;
    }

    return prisma.order.findMany({
        where: whereClause,
        include: {
            customer: { select: { name: true } },
            restaurant: { select: { name: true } },
        },
        orderBy: { order_time: 'desc' },
    }) as Promise<Order[]>;
};

export const findById = async (id: number): Promise<Order> => {
    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            customer: { select: { name: true } },
            restaurant: { select: { name: true } },
        },
    });

    if (!order) {
        throw new ApiError(404, 'Order not found.');
    }
    return order as Order;
};