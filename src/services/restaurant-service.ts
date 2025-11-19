import { prismaClient } from "../utils/database-util";
import { ApiError } from '../errors/api-error';

const prisma = prismaClient;

export const create = async (data: { name: string, description?: string, is_open?: boolean }) => {
    return prisma.restaurant.create({ data });
};

export const findAll = async (status?: string) => {
    let whereClause = {};

    if (status) {
        whereClause = { is_open: status.toLowerCase() === 'open' };
    }
    
    return prisma.restaurant.findMany({ where: whereClause });
};

export const findById = async (id: number) => {
    const restaurant = await prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
        throw new ApiError(404, 'Restaurant not found.');
    }
    return restaurant;
};

export const update = async (id: number, data: { name?: string, description?: string, is_open?: boolean }) => {
    try {
        return await prisma.restaurant.update({
        where: { id },
        data,
        });
    } catch (error) {
        if ((error as any).code === 'P2025') {
            throw new ApiError(404, 'Restaurant not found for update.');
        }
        throw error;
    }
};

export const remove = async (id: number) => {
    try {
        await prisma.restaurant.delete({ where: { id } });
    } catch (error) {
        if ((error as any).code === 'P2025') {
            throw new ApiError(404, 'Restaurant not found for deletion.');
        }
        throw error; 
    }
};