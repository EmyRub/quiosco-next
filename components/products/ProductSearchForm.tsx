"use client"

import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { SearchSchema } from "@/src/schema/zod"

export default function ProductSearchForm() {
    const router = useRouter()

    const handleSearchForm = (formData: FormData) => {

        const data = {
            search: formData.get('search')
        }

        const result = SearchSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        router.push(`/admin/products/search?search=${result.data.search}`)
    }

    return (
        <form
            action={handleSearchForm}
            className="flex items-center">

            <input
                type="text"
                name="search"
                placeholder="Buscar Producto"
                className="p-2 placeholder-gray-400 bg-white w-full"
            />

            <input
                type="submit"
                value="Buscar"
                className="bg-indigo-600 uppercase text-white cursor-pointer p-2" />
        </form>
    )
}
