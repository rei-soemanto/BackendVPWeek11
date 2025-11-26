import { prismaClient } from "../utils/database-util";
import { calculateETA } from "../utils/eta-calc-util";

const prisma = prismaClient;

export const create = async() => {
    await prisma.customer.createMany({ data: [
            {
                "name": "Althaf",
                "phone": "081234567890",
            },
            {
                "name": "Jae",
                "phone": "086969696969",
            },
            {
                "name": "Eugene",
                "phone": "081087654321",
            },
        ]
    });
    await prisma.restaurant.createMany({ data: [
            {
                "name": "Althaf Resto",
                "description": "Porsi dijamin banyak, yang masak orang besar",
                "is_open": true
            },
            {
                "name": "Warung Mama Jae",
                "description": "Rasa dijamin enak, masakan mamanya Jae",
                "is_open": true
            },
            {
                "name": "Rumah Eugene",
                "description": "Masih nyari tempat",
                "is_open": false
            },
        ]
    });
    await prisma.order.createMany({ data: [
            {
                "estimated_eta": new Date(calculateETA(2)),
                "customer_id": 1,
                "restaurant_id": 1,
                "item_amount": 2,
            },
            {
                "estimated_eta": new Date(calculateETA(3)),
                "customer_id": 1,
                "restaurant_id": 2,
                "item_amount": 3,
            },
            {
                "estimated_eta": new Date(calculateETA(2)),
                "customer_id": 2,
                "restaurant_id": 2,
                "item_amount": 2,
            },
            {
                "estimated_eta": new Date(calculateETA(5)),
                "customer_id": 3,
                "restaurant_id": 1,
                "item_amount": 5,
            },
            {
                "estimated_eta": new Date(calculateETA(1)),
                "customer_id": 3,
                "restaurant_id": 3,
                "item_amount": 1,
            },
        ]
    });
};