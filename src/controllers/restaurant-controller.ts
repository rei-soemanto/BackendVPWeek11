import { PrismaClient } from '../../generated/prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createRestaurant = async (req: Request, res: Response) => {
    const { name, description, is_open } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Restaurant name is required.' });
    }

    try {
        const restaurant = await prisma.restaurant.create({
        data: { 
            name, 
            description, 
            is_open: is_open !== undefined ? is_open : true
        },
        });
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create restaurant.' });
    }
    };

    export const getRestaurants = async (req: Request, res: Response) => {
    const status = req.query.status as string; 
    let whereClause = {};

    if (status) {
        if (status.toLowerCase() === 'open') {
        whereClause = { is_open: true };
        } else if (status.toLowerCase() === 'closed') {
        whereClause = { is_open: false };
        } else {
        return res.status(400).json({ error: 'Invalid status query. Use "open" or "closed".' });
        }
    }

    try {
        const restaurants = await prisma.restaurant.findMany({
        where: whereClause,
        });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restaurants.' });
    }
    };

    export const getRestaurantById = async (req: Request, res: Response) => {
    const restaurantId = parseInt(req.params.id);
    
    try {
        const restaurant = await prisma.restaurant.findUnique({
        where: { id: restaurantId },
        });

        if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found.' });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restaurant info.' });
    }
    };

    export const updateRestaurant = async (req: Request, res: Response) => {
    const restaurantId = parseInt(req.params.id);
    const { name, description, is_open } = req.body;
    
    const updateData: { name?: string, description?: string, is_open?: boolean } = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (is_open !== undefined) updateData.is_open = is_open;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'No valid fields provided for update.' });
    }

    try {
        const updatedRestaurant = await prisma.restaurant.update({
        where: { id: restaurantId },
        data: updateData,
        });
        res.json(updatedRestaurant);
    } catch (error) {
        if ((error as any).code === 'P2025') {
            return res.status(404).json({ error: 'Restaurant not found.' });
        }
        res.status(500).json({ error: 'Failed to update restaurant info.' });
    }
    };

    export const deleteRestaurant = async (req: Request, res: Response) => {
    const restaurantId = parseInt(req.params.id);

    try {
        await prisma.restaurant.delete({
        where: { id: restaurantId },
        });
        res.status(204).send();
    } catch (error) {
        if ((error as any).code === 'P2025') {
            return res.status(404).json({ error: 'Restaurant not found.' });
        }
        res.status(500).json({ error: 'Failed to delete restaurant.' });
    }
};