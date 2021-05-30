export interface Item {
    _id?: string,
    item_id: string,
    name: string,
    price: number,
    images: [string],
    sizes: [string],
    description: string,
    discount?: number,
}