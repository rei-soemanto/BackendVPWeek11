import { Request, Response, NextFunction } from 'express';
import * as restaurantService from '../services/restaurant-service';
import * as validation from '../validations/restaurant-validations';
import { ApiError } from '../errors/api-error';

const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// 1. Create new Restaurant
export const createRestaurant = catchAsync(async (req: Request, res: Response) => {
    const data = validation.createRestaurantSchema.parse(req.body);
    const restaurant = await restaurantService.create(data);
    res.status(201).json(restaurant);
});

// 2. Display Restaurants (All or Filtered)
export const getRestaurants = catchAsync(async (req: Request, res: Response) => {
  // 2b. Display opened/closed restaurants (using query parameter)
    const query = validation.statusFilterSchema.parse(req.query);
    
    const restaurants = await restaurantService.findAll(query.status);
    res.json(restaurants);
});

// 2a. Display Restaurant Info (by ID)
export const getRestaurantById = catchAsync(async (req: Request, res: Response) => {
    const restaurantId = parseInt(req.params.id);
    const restaurant = await restaurantService.findById(restaurantId);
    res.json(restaurant);
});

// 3. Update Restaurant Info (Combined Update)
export const updateRestaurant = catchAsync(async (req: Request, res: Response) => {
    const restaurantId = parseInt(req.params.id);
    
    if (Object.keys(req.body).length === 0) {
        throw new ApiError(400, 'No valid fields provided for update.');
    }
    
    const data = validation.updateRestaurantSchema.parse(req.body);
    const updatedRestaurant = await restaurantService.update(restaurantId, data);
    res.json(updatedRestaurant);
});

// 4. Delete Restaurant Info
export const deleteRestaurant = catchAsync(async (req: Request, res: Response) => {
    const restaurantId = parseInt(req.params.id);
    await restaurantService.remove(restaurantId);
    res.status(204).send();
});