"use client"
import { useRouter } from "next/navigation";


export default function GoBackButton() {
    const router = useRouter()

    return (
        <button
            //Regresa a la página anterior
            onClick={() => router.back()}
            className="bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto"
        >Volver</button>

    )
}
