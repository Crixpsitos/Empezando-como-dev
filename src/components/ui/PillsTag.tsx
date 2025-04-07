import { useStore } from "@/store/useStore"
import { useShallow } from 'zustand/react/shallow'
import { Button } from "./button"

interface PillsTagProps {
    tag: string
}

export const PillsTag = ({ tag }: PillsTagProps) => {

    const { selectedTags, setSelectedTags } = useStore(useShallow(state => ({
        selectedTags: state.selectedTags, setSelectedTags: state.setSelectedTags
    })))

    //function para seleccionar el tag deseado y agregarlo en el array de tags 

    const handleTagChange = (tag: string) => {
        //verificamos si ya hay un tag seleccionado
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t: string) => t !== tag))
        } else {
            setSelectedTags([...selectedTags, tag])
        }
    }

    return (
        <>
            <Button
                onClick={() => handleTagChange(tag)}
                className={
                    `px-3 py-1.5 text-sm rounded-full cursor-pointer transition-colors ${selectedTags.includes(tag)
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`
                }
            >
                {tag.replaceAll("-", " ")}
            </Button >
        </>
    )
}



