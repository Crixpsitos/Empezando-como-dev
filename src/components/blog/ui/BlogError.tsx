import { Button } from "@/components/ui/button"
import { Home, RefreshCw } from "lucide-react"
import { memo } from "react"

interface BlogErrorProps {
    category?: string | null,
    onResetFilters?: () => void
}

export const BlogError = memo(({ category, onResetFilters }: BlogErrorProps) => {
    return (
        <div className="flex col-span-2 flex-col items-center justify-center py-16 px-4 text-center">
            {/* Empty state illustration */}
            <div className="w-24 h-24 mb-6 rounded-full bg-gray-800 flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-400"
                >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">No hay más blogs referente a esta categoría</h2>

            <p className="text-gray-400 mb-8 max-w-md">
                {category
                    ? `No hemos encontrado publicaciones en la categoría "${category}".`
                    : "No hemos encontrado publicaciones con los filtros actuales."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <a href="/blog/">
                    <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2">
                        <Home size={18} />
                        Volver a la página principal
                    </Button>
                </a>

                <Button
                    variant="link"
                    className="border-emerald-500 text-emerald-400 hover:bg-emerald-950 hover:text-emerald-300 flex items-center gap-2"
                    onClick={onResetFilters}
                    disabled={!onResetFilters}
                >
                    <RefreshCw size={18} />
                    Reiniciar filtros
                </Button>
            </div>
        </div>
    )
})