import { prismaClient } from "../utils/database-util";
import { ApiError } from '../errors/api-error';

const prisma = prismaClient;

export const create = async (data: { name: string, phone?: string }) => {
    return prisma.customer.create({ data });
};

export const findAll = async () => {
    return prisma.customer.findMany();
};

export const findById = async (id: number) => {
    const customer = await prisma.customer.findUnique({ where: { id } });
    if (!customer) {
        throw new ApiError(404, 'Customer not found.');
    }
    return customer;
};

export const update = async (id: number, data: { name?: string, phone?: string }) => {
    try {
        return await prisma.customer.update({
        where: { id },
        data,
        });
    } catch (error) {
        if ((error as any).code === 'P2025') {
            throw new ApiError(404, 'Customer not found for update.');
        }
        throw error;
    }
};

export const remove = async (id: number) => {
    try {
        await prisma.customer.delete({ where: { id } });
    } catch (error) {
        if ((error as any).code === 'P2025') {
            throw new ApiError(404, 'Customer not found for deletion.');
        }
        throw error;
    }
};