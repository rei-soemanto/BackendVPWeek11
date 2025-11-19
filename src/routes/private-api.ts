import { Router } from 'express';
import * as customerController from '../controllers/customer-controller';
import * as restaurantController from '../controllers/restaurant-controller';
import * as orderController from '../controllers/order-controller';

const router = Router();

// --- CUSTOMER ROUTES ---
// 1. Create new Customer
router.post('/customers', customerController.createCustomer);
// 2. Display Customer Info (All or By ID)
router.get('/customers', customerController.getCustomers);
router.get('/customers/:id', customerController.getCustomerById);
// 3a. Update Customer Name / 3b. Update Customer Phone
// We'll use a single PUT route for partial update to simplify
router.put('/customers/:id', customerController.updateCustomerName); // Rename this in your controller to be generic
router.put('/customers/:id/name', customerController.updateCustomerName); // Example specific routes
router.put('/customers/:id/phone', customerController.updateCustomerPhone);
// 4. Delete Customer
router.delete('/customers/:id', customerController.deleteCustomer);

// --- RESTAURANT ROUTES ---
// 1. Create new Restaurant
router.post('/restaurants', restaurantController.createRestaurant);
// 2. Display Restaurants (All or Filtered by status) / 2a. Display Restaurant Info
router.get('/restaurants', restaurantController.getRestaurants); // Handles ?status=open/closed
router.get('/restaurants/:id', restaurantController.getRestaurantById);
// 3. Update Restaurant Info (name, description, status)
router.put('/restaurants/:id', restaurantController.updateRestaurant);
// 4. Delete Restaurant Info
router.delete('/restaurants/:id', restaurantController.deleteRestaurant);

// --- ORDER ROUTES ---
// 1. Create new Order
router.post('/orders', orderController.createOrder);
// 2. Display Orders (All, by customer, by restaurant)
// 2c. Display Time ordered / 2d. Display Estimated Time of Arrival (included in response object)
router.get('/orders', orderController.getOrders); // Handles ?customer_id=X or ?restaurant_id=Y
router.get('/orders/:id', orderController.getOrderById);

export default router;