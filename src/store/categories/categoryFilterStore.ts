import { createStore } from "zustand";

const useCategoryFilterStore = createStore((set) => ({
    selectedCategory: null,
    setSelectedCategory: (category: string) => set({ selectedCategory: category })
}))

export default useCategoryFilterStore