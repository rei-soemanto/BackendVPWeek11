import { z } from 'zod';

export const createOrderSchema = z.object({
    customer_id: z.number().int('Customer ID must be an integer.'),
    restaurant_id: z.number().int('Restaurant ID must be an integer.'),
    item_amount: z.number().int('Item amount must be an integer.').min(1, 'Item amount must be at least 1.'),
});

export const filterOrderSchema = z.object({
    customer_id: z.string()
        .transform(val => {
            const num = Number(val);
            return isNaN(num) ? val : num; 
        })
        .pipe(z.number().int('Customer ID must be an integer.'))
        .optional(),
        
    restaurant_id: z.string()
        .transform(val => {
            const num = Number(val);
            return isNaN(num) ? val : num;
        })
        .pipe(z.number().int('Restaurant ID must be an integer.'))
        .optional(),
});