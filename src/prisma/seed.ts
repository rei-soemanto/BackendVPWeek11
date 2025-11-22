import * as dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '../../generated/prisma/client';
import { faker } from '@faker-js/faker'; // Import Faker
import { calculateETA } from '../utils/eta-calc-util'; 

const prisma = new PrismaClient();

// Constants for generation
const NUM_CUSTOMERS = 3;
const NUM_RESTAURANTS = 3;
const NUM_ORDERS = 5;

async function main() {
    console.log('Start seeding with Faker.js...');

    // --- Clean existing data (Optional, but good practice for seeding) ---
    await prisma.order.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.restaurant.deleteMany();
    console.log('Cleared existing Customer, Restaurant, and Order data.');

    // --- 1. Customers ---
    const customerIds: number[] = [];
    for (let i = 0; i < NUM_CUSTOMERS; i++) {
        const customer = await prisma.customer.create({
        data: {
            name: faker.person.fullName(),
            phone: '08' + faker.string.numeric(10),
        },
        });
        customerIds.push(customer.id);
    }
    console.log(`${NUM_CUSTOMERS} Customers created.`);


    // --- 2. Restaurants ---
    const restaurantIds: number[] = [];
    for (let i = 0; i < NUM_RESTAURANTS; i++) {
        const restaurant = await prisma.restaurant.create({
        data: {
            name: faker.company.name(),
            description: faker.lorem.sentences(1),
            is_open: faker.datatype.boolean(0.8), // 80% chance of being open
        },
        });
        restaurantIds.push(restaurant.id);
    }
    console.log(`${NUM_RESTAURANTS} Restaurants created.`);


    // --- 3. Orders ---
    // Ensure we have IDs to link orders
    if (customerIds.length === 0 || restaurantIds.length === 0) {
        console.error('Cannot create orders: Missing Customer or Restaurant IDs.');
        return;
    }

    for (let i = 0; i < NUM_ORDERS; i++) {
        const randomCustomerId = faker.helpers.arrayElement(customerIds);
        const randomRestaurantId = faker.helpers.arrayElement(restaurantIds);
        const itemAmount = faker.number.int({ min: 1, max: 8 });

        await prisma.order.create({
        data: {
            customer_id: randomCustomerId,
            restaurant_id: randomRestaurantId,
            item_amount: itemAmount,
            estimated_eta: calculateETA(itemAmount), // Reusing your ETA logic
            order_time: faker.date.recent({ days: 1 }), // Orders placed in the last week
        },
        });
    }
    console.log(`${NUM_ORDERS} Orders created.`);
    
    console.log('Seeding finished successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        // process.exit(1); // Use only if TS environment is configured
    })
    .finally(async () => {
        await prisma.$disconnect();
    });