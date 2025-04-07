import { create } from "zustand";
import { createCategoryFilterSlice, type CategoryFilterState } from "./categories/createCategoryFilterSlice";
import { createTagsFilterSlice } from "./tags/createTagsFilterSlice";
import { type TagsFilterState } from "./tags/createTagsFilterSlice";
import { createBlogSlice } from "./blogs/createBlogSlice";

type StoreState = CategoryFilterState & TagsFilterState & createBlogSlice

export const useStore = create<StoreState>((...args) => ({
    ...(createCategoryFilterSlice(...args)),
    ...(createTagsFilterSlice(...args)),
    ...(createBlogSlice(...args)),
}))