import { prisma } from "@/src/lib/prisma"

//Permite que vuelva a hacer la petición en vez de cacheo
export const dynamic = 'force-dynamic'

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
