import { PrismaClient } from '../../generated/prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createCustomer = async (req: Request, res: Response) => {
    const { name, phone } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Customer name is required.' });
    }

    try {
        const customer = await prisma.customer.create({
        data: { name, phone },
        });
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create customer.' });
    }
    };

    export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await prisma.customer.findMany();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customers.' });
    }
    };

    export const getCustomerById = async (req: Request, res: Response) => {
    const customerId = parseInt(req.params.id);
    
    try {
        const customer = await prisma.customer.findUnique({
        where: { id: customerId },
        });

        if (!customer) {
        return res.status(404).json({ error: 'Customer not found.' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customer info.' });
    }
    };

    export const updateCustomerName = async (req: Request, res: Response) => {
    const customerId = parseInt(req.params.id);
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'New name is required.' });
    }

    try {
        const updatedCustomer = await prisma.customer.update({
        where: { id: customerId },
        data: { name },
        });
        res.json(updatedCustomer);
    } catch (error) {
        if ((error as any).code === 'P2025') {
            return res.status(404).json({ error: 'Customer not found.' });
        }
        res.status(500).json({ error: 'Failed to update customer name.' });
    }
    };

    export const updateCustomerPhone = async (req: Request, res: Response) => {
    const customerId = parseInt(req.params.id);
    const { phone } = req.body;
    
    try {
        const updatedCustomer = await prisma.customer.update({
        where: { id: customerId },
        data: { phone },
        });
        res.json(updatedCustomer);
    } catch (error) {
        if ((error as any).code === 'P2025') {
            return res.status(404).json({ error: 'Customer not found.' });
        }
        res.status(500).json({ error: 'Failed to update customer phone number.' });
    }
    };

    export const deleteCustomer = async (req: Request, res: Response) => {
    const customerId = parseInt(req.params.id);

    try {
        await prisma.customer.delete({
        where: { id: customerId },
        });
        res.status(204).send();
    } catch (error) {
        if ((error as any).code === 'P2025') {
            return res.status(404).json({ error: 'Customer not found.' });
        }
        res.status(500).json({ error: 'Failed to delete customer.' });
    }
};