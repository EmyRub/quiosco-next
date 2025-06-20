import Link from 'next/link';
import { prisma } from '@/src/lib/prisma'
import { redirect } from 'next/navigation';
import Heading from '@/components/ui/Heading'
import ProductTable from '@/components/products/ProductsTable'
import ProductsPagination from '@/components/products/ProductsPagination'
import ProductSearchForm from '@/components/products/ProductSearchForm';

async function productCount() {
  //count, función que indica el total en la DB
  return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize

  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      //Consigue la relación de una tabla con otro
      category: true
    }
  })
  return products
}

//Tipografía para productsTable, se adapta si tiene cambios en zod
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {

  const page = + searchParams.page || 1
  const pageSize = 10

  if (page < 0) redirect('/admin/products')

  // Agrupa las peticiones en una sola, consulta paralela (son independientes)
  const productsData = getProducts(page, pageSize)
  const totalProductsData = productCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / pageSize)

  if (page > totalPages) redirect('/admin/products')

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className='flex flex-col lg:flex-row lg:justify-between gap-5 '>

        <Link
          href={'/admin/products/new'}
          className='bg-amber-400 w-full lg:w-auto text-lg px-10 py-3 text-center font-bold cursor-pointer'
        >Crear Producto</Link>

        <ProductSearchForm />

      </div>

      <ProductTable products={products} />

      <ProductsPagination
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}
