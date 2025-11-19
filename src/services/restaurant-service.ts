import { ApiError } from '../errors/error-api';
import { prismaClient } from '../utils/database-util';
import { Restaurant, RestaurantCreateInput, RestaurantUpdateInput } from '../models/restaurant-model';

const prisma = prismaClient;

export const create = async (data: RestaurantCreateInput): Promise<Restaurant> => {
    return prisma.restaurant.create({ data }) as Promise<Restaurant>;
};

export const findAll = async (status?: string): Promise<Restaurant[]> => {
    let whereClause = {};

    if (status) {
        whereClause = { is_open: status.toLowerCase() === 'open' };
    }
    
    return prisma.restaurant.findMany({ where: whereClause }) as Promise<Restaurant[]>;
};

export const findById = async (id: number): Promise<Restaurant> => {
    const restaurant = await prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
        throw new ApiError(404, 'Restaurant not found.');
    }
    return restaurant as Restaurant;
};

export const update = async (id: number, data: RestaurantUpdateInput): Promise<Restaurant> => {
    try {
        return prisma.restaurant.update({
            where: { id },
            data,
        }) as Promise<Restaurant>;
    } catch (error) {
        if ((error as any).code === 'P2025') {
            throw new ApiError(404, 'Restaurant not found for update.');
        }
        throw error;
    }
};

export const remove = async (id: number): Promise<void> => {
    try {
        await prisma.restaurant.delete({ where: { id } });
    } catch (error) {
        if ((error as any).code === 'P2025') {
            throw new ApiError(404, 'Restaurant not found for deletion.');
        }
        throw error; 
    }
};