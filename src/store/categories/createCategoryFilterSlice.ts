import { type StateCreator } from "zustand";

export interface CategoryFilterState {
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
}

export const createCategoryFilterSlice: StateCreator<
    CategoryFilterState,
    [],
    [],
    CategoryFilterState
> = (set, get) => ({
    selectedCategory: null,
    setSelectedCategory: (category) => set({ selectedCategory: category }),
});

