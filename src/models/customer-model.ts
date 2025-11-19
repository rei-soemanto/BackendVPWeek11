export interface Customer {
    id: number;
    name: string;
    phone: string | null;
}

export interface CustomerCreateInput {
    name: string;
    phone?: string | null;
}

export interface CustomerUpdateInput {
    name?: string;
    phone?: string | null;
}