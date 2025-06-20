import { products } from "./data/products";
import { categories } from "./data/categories";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {

    try {
        await prisma.category.createMany({
            data: categories
        })
        await prisma.product.createMany({
            data: products
        })
    
    } catch (error) {
        console.log(error)
    }
}

//Se le debe agregar más información
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })