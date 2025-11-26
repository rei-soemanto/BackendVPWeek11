import { Router } from 'express';
import * as customerController from '../controllers/customer-controller'; 
import * as restaurantController from '../controllers/restaurant-controller';
import * as orderController from '../controllers/order-controller';
import * as seederController from '../controllers/seeder-controller';

const router = Router();

router.post('/customers', customerController.createCustomer);
router.get('/customers', customerController.getCustomers);
router.get('/customers/:id', customerController.getCustomerById);
router.put('/customers/:id', customerController.updateCustomer);
router.delete('/customers/:id', customerController.deleteCustomer);

router.post('/restaurants', restaurantController.createRestaurant);
router.get('/restaurants', restaurantController.getRestaurants);
router.get('/restaurants/:id', restaurantController.getRestaurantById);
router.put('/restaurants/:id', restaurantController.updateRestaurant);
router.delete('/restaurants/:id', restaurantController.deleteRestaurant);

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.get('/orders/:id', orderController.getOrderById);

router.post('/seeders', seederController.createSeeder);

export default router;