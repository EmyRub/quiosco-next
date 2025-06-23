"use client"

import useSWR from 'swr'
import Heading from '@/components/ui/Heading'
import { OrderWithProducts } from '@/src/types'
import OrderCard from '@/components/order/OrderCard'


export default function OrderPage() {

    const url = '/admin/orders/api'

    //Refresh automático
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 600,
        revalidateOnFocus: false
    })

        console.log('de',data)

    if (isLoading) return <p>Cargando...</p>

    if (data) return (
        <>
            <Heading>Administrar Ordenes</Heading>


            {data.length ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                    {data.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                        />
                    ))}
                </div>
            ) : <p className='text-center'>No hay ordenes pendientes</p>}

        </>
    )
}
