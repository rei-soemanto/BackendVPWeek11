import { z } from 'zod';

export const createCustomerSchema = z.object({
    name: z.string().trim().min(1, 'Customer name is required and cannot be empty.'), 
    phone: z.string().optional(),
});

export const updateCustomerSchema = z.object({
    name: z.string().trim().min(1, 'Name cannot be empty.').optional(),
    phone: z.string().optional(),
});