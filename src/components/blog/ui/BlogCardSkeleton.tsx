import { Calendar, Clock, Eye, Heart, MessageSquare } from "lucide-react"
import { memo } from "react"

export const BlogCardSkeleton = memo(() => {
    return (
        <article className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 flex flex-col h-full">
            <div className="block overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                    {/* Image skeleton */}
                    <div className="absolute inset-0 bg-gray-700 animate-pulse" />
                    <div className="absolute top-0 left-0 m-3">
                        {/* Category skeleton */}
                        <div className="w-20 h-6 bg-gray-700 animate-pulse rounded-md" />
                    </div>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                {/* Tags skeleton */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="w-16 h-6 bg-gray-700 animate-pulse rounded-md" />
                    ))}
                </div>
                {/* Title skeleton */}
                <div className="h-7 bg-gray-700 animate-pulse rounded mb-2" />

                {/* Description skeleton - multiple lines */}
                <div className="space-y-2 mb-4 flex-grow">
                    <div className="h-4 bg-gray-700 animate-pulse rounded w-full" />
                    <div className="h-4 bg-gray-700 animate-pulse rounded w-5/6" />
                    <div className="h-4 bg-gray-700 animate-pulse rounded w-4/6" />
                </div>

                {/* Date and time skeleton */}
                <div className="flex items-center text-sm text-gray-400 mt-auto pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-1 mr-4">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <div className="w-24 h-4 bg-gray-700 animate-pulse rounded" />
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <div className="w-12 h-4 bg-gray-700 animate-pulse rounded" />
                    </div>
                </div>
            </div>
            <div className="px-6 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5 text-gray-600" />
                        <div className="w-6 h-4 bg-gray-700 animate-pulse rounded" />
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquare className="w-5 h-5 text-gray-600" />
                        <div className="w-6 h-4 bg-gray-700 animate-pulse rounded" />
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Eye className="w-5 h-5 text-gray-600" />
                    <div className="w-10 h-4 bg-gray-700 animate-pulse rounded" />
                </div>
            </div>
        </article>
    )
})



