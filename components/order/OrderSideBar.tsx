import Logo from "../ui/Logo"
import { prisma } from "@/src/lib/prisma"
import CategoryIcon from "../ui/CategoryIcon"

async function getCategories() {
    return await prisma.category.findMany()
}

// Next agregaron async/await a los componentes
export default async function OrderSideBar() {

    const categories = await getCategories()

    return (
        <aside className="md:w-72 md:h-screen bg-white">
            <Logo />
            <nav className="mt-10">
                {categories.map(category => (
                    <CategoryIcon
                        key={category.id}
                        category={category}
                    />
                ))}
            </nav>
        </aside>
    )
}
