import { Customer } from './customer-model';
import { Restaurant } from './restaurant-model';

export interface Order {
    id: number;
    order_time: Date;
    item_amount: number;
    estimated_eta: Date;
    
    customer_id: number;
    restaurant_id: number;

    customer?: { name: string };
    restaurant?: { name: string };
}

export interface OrderCreateInput {
    customer_id: number;
    restaurant_id: number;
    item_amount: number;
}