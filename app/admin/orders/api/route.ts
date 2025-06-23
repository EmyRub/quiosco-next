import { prisma } from "@/src/lib/prisma"

//Consulta la api, obtiene productos
export async function GET() {
    const orders = await prisma.order.findMany({
        where: {
            status: false
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })

    return Response.json(orders)
}
