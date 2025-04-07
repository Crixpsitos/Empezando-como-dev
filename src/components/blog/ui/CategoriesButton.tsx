import { Button } from "@/components/ui/button"
import { useStore } from "@/store/useStore"

export const CategoriesButton = ({ category, postCounts }: { category: string, postCounts: Record<string, number> }) => {

    const setSelectedCategory = useStore(state => state.setSelectedCategory)
    const selectedCategory = useStore(state => state.selectedCategory)
    const onResetFilters = useStore(state => state.onResetFilters)


    //funcion para cambiar la categoria seleccionada

    const handleCategoryChange = (category: string) => {
        //verificamos si ya hay una categoria seleccionada
        if (selectedCategory === category) {
            setSelectedCategory(null)
        } else {
            setSelectedCategory(category)
        }
    }

    return (
        <Button className={` block px-4 space-x-2 py-2 hover:bg-purple-600/20 cursor-pointer rounded-lg ${selectedCategory === category ? "text-white cursor-auto bg-purple-600/20" : "transition-all duration-300  text-gray-300 hover:text-white"} group`} onClick={() => handleCategoryChange(category)}>

            <span>{category.replaceAll("-", " ")}</span>
            <span className="bg-purple-600/20 px-2 py-1 rounded-full text-xs group-hover:bg-purple-600/40">
                {postCounts[category] || 0}
            </span>


        </Button>
    )
}
