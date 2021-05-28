export interface Item {
    item_id: string,
    name: string,
    price: number,
    images: [string],
    sizes: [string],
    description: string,
    discount?: number,
}