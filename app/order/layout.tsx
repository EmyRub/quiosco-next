import OrderSideBar from '@/components/order/OrderSideBar';
import OrderSummary from '@/components/order/OrderSummary';
import ToastNotification from '@/components/ui/ToastNotification';
import React from 'react'

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="md:flex">
                <OrderSideBar />

                <main className='md:flex-1 md:h-screen md:overflow-y-scroll p-5'>
                    {children}
                </main>

                <OrderSummary />
            </div>
            <ToastNotification />
        </>
    );
}