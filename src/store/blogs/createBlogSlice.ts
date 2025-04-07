import { type StateCreator } from "zustand";
import { type Post } from "@/interfaces/Post";


export interface CreateBlogSlice {
    data: Post[] | null;
    loading: boolean;
    hasError: boolean;
    error: Error | null;
    lastDoc: Post | null;
    prevData: Post[] | null;
    setData: (data: Post[] | null) => void;
    setLoading: (loading: boolean) => void;
    setHasError: (hasError: boolean) => void;
    setError: (error: Error | null) => void;
    setLastDoc: (lastDoc: Post | null) => void;
    setPrevData: (prevData: Post[] | null) => void;
    onResetFilters: () => void;

}

export const createBlogSlice: StateCreator<
    CreateBlogSlice,
    [],
    [],
    CreateBlogSlice> = (set, get) => ({
        data: null,
        loading: true,
        hasError: false,
        error: null,
        lastDoc: null,
        prevData: null,
        setData: (data) => set({ data }),
        setLoading: (loading) => set({ loading }),
        setHasError: (hasError) => set({ hasError }),
        setError: (error) => set({ error }),
        setLastDoc: (lastDoc) => set({ lastDoc }),
        setPrevData: (prevData) => set({ prevData }),
        onResetFilters: () => {
            set({
                data: null,
                loading: false,
                hasError: false,
                error: null,
                lastDoc: get().prevData ? get().prevData?.at(-1) : null,
                prevData: get().prevData
            })
        }
    })