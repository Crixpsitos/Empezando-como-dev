import { type StateCreator } from "zustand";


export interface TagsFilterState {
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
}

export const createTagsFilterSlice: StateCreator<
    TagsFilterState,
    [],
    [],
    TagsFilterState
> = (set, get) => ({
    selectedTags: [],
    setSelectedTags: (tags) => set({ selectedTags: tags }),
});