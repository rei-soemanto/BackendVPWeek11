export interface Restaurant {
    id: number;
    name: string;
    description: string | null;
    is_open: boolean;
}

export interface RestaurantCreateInput {
    name: string;
    description?: string | null;
    is_open?: boolean;
}

export interface RestaurantUpdateInput {
    name?: string;
    description?: string | null;
    is_open?: boolean;
}