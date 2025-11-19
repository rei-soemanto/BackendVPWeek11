import { z } from 'zod';

export const createRestaurantSchema = z.object({
    name: z.string().trim().min(1, 'Restaurant name is required.'),
    description: z.string().trim().optional(),
    is_open: z.boolean().default(true).optional(),
});

export const updateRestaurantSchema = z.object({
    name: z.string().trim().min(1, 'Restaurant name cannot be empty.').optional(),
    description: z.string().trim().optional(),
    is_open: z.boolean().optional(),
});

export const statusFilterSchema = z.object({
    status: z.enum(['open', 'closed'], { message: 'Status must be "open" or "closed".' }).optional(),
});