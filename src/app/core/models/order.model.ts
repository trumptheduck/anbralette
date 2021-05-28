import { Item } from "./item.model";


export interface Order {
    amount: number,
    size: string,
    item: Item
}