const ITEM_TIME_MINUTES = 10;
const DELIVERY_TIME_MINUTES = 10;

export function calculateETA(itemAmount: number): Date {
    const totalMinutes = (itemAmount * ITEM_TIME_MINUTES) + DELIVERY_TIME_MINUTES;
    const orderTime = new Date();
    const estimatedEta = new Date(orderTime.getTime() + totalMinutes * 60000);
    return estimatedEta;
}