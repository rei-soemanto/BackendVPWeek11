import { prismaClient } from "../utils/database-util";
import { ApiError } from '../errors/error-api';
import { Customer, CustomerCreateInput, CustomerUpdateInput } from '../models/customer-model';

const prisma = prismaClient;

export const create = async (data: CustomerCreateInput): Promise<Customer> => {
    return prisma.customer.create({ data }) as Promise<Customer>;
};

export const findAll = async (): Promise<Customer[]> => {
    return prisma.customer.findMany() as Promise<Customer[]>;
};

export const findById = async (id: number) => {
    const customer = await prisma.customer.findUnique({ where: { id } });
    if (!customer) {
        throw new ApiError(404, 'Customer not found.');
    }
    return customer;
};

export const update = async (id: number, data: CustomerUpdateInput): Promise<Customer> => {
    try {
        return prisma.customer.update({
            where: { id },
            data,
        }) as Promise<Customer>;
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