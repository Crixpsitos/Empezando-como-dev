import type { Post } from "@/interfaces/Post"
import BlogCard from "./ui/BlogCard"
import { useStore } from "@/store/useStore"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { BlogsRepository } from "@/repositories/client/blogs/blogsRepository"
import { BlogCardSkeleton } from "./ui/BlogCardSkeleton"
import { BlogError } from "./ui/BlogError"
import { useShallow } from "zustand/react/shallow"

interface BlogProps {
    post: Post[],
    page: number
}

const BlogRepository = new BlogsRepository()

const BlogGrid = ({ post, page }: BlogProps) => {
    const { selectedCategory, setSelectedCategory, selectedTags, setSelectedTags } = useStore(useShallow(state => ({
        selectedCategory: state.selectedCategory,
        setSelectedCategory: state.setSelectedCategory,
        selectedTags: state.selectedTags,
        setSelectedTags: state.setSelectedTags
    })))



    console.log(selectedTags)

    const prevMemoPost = useMemo(() => post, [post])

    const isFirstRender = useRef(true)

    const [blogState, setBlogState] = useState<{
        data: Post[] | null,
        loading: boolean,
        hasError: boolean,
        error: Error | null,
        lastDoc: Post | null
    }>({
        data: post,
        loading: false,
        hasError: false,
        error: null,
        lastDoc: null
    })

    console.log(selectedTags)


    const fetchBlogsWithCategory = useCallback(async () => {
        setBlogState((prev) => ({ ...prev, loading: true }))
        try {
            const { data, lastVisible } = await BlogRepository.getBlogsWithCategory(selectedCategory, blogState.lastDoc, page, selectedTags)
            setBlogState((prev) => ({
                ...prev,
                data: data,
                loading: false,
                hasError: false,
                lastDoc: lastVisible
            }))
        } catch (error) {
            setBlogState((prev) => ({
                ...prev,
                data: null,
                loading: false,
                hasError: true,
                error: error as Error
            }))

        }
    }, [selectedCategory, page, selectedTags])
    useEffect(() => {
        if (selectedCategory || selectedTags.length > 0) {
            fetchBlogsWithCategory()
        }
    }, [selectedCategory, fetchBlogsWithCategory, page, selectedTags])

    const didReset = useRef(false)

    const onResetFilters = useCallback(() => {
        setBlogState((prev) => ({
            ...prev,
            data: prevMemoPost,
            loading: false,
            hasError: false,
            error: null,
            lastDoc: null
        }))

        setSelectedCategory(!selectedCategory ? null : selectedCategory)
        setSelectedTags(selectedTags.length === 0 ? [] : selectedTags)

    }, [prevMemoPost])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        const noFiltersSelected = !selectedCategory && selectedTags.length === 0

        if (noFiltersSelected && !didReset.current) {
            onResetFilters()
            didReset.current = true
        }

        if (!noFiltersSelected && didReset.current) {
            didReset.current = false
        }

    }, [selectedCategory, selectedTags, onResetFilters])


    return (
        <section
            className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-80 animate-fade-in"
        >
            {blogState.data && !blogState.loading && blogState.data.map((posts) => <BlogCard key={posts.id} post={posts} />)}
            {blogState.loading && [...Array(6)].map((_, index) => <BlogCardSkeleton key={index} />)}


            {blogState.hasError && <BlogError onResetFilters={onResetFilters} category={selectedCategory} />}


        </section>
    )
}


export default BlogGrid