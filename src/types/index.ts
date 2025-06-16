import { Product } from "@prisma/client";

export type orderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number
    subtotal: number
}