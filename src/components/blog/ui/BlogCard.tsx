
import type { Post } from "@/interfaces/Post";
import { Calendar, Clock, Eye, Heart, MessageSquare } from "lucide-react";
import { Button } from "../../ui/button";


interface BlogCardProps {
  post: Post
}

const BlogPostCard = ({ post }: BlogCardProps) => {
  return (
    <article className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 group flex flex-col h-full">
      <a href={`/blog/${post.slug}`} className="block overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post?.title || "Imagen del post"}
            width={850}
            height={850}
            loading="lazy"
            decoding="async"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-0 left-0 m-3">
            <span className="px-2 py-1 text-xs font-medium bg-emerald-600 text-white rounded-md">
              {post.categories}
            </span>
          </div>
        </div>
      </a>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags?.slice(0, 3).map((tag, index) => (
            <span key={`${tag}-${index}`} className="text-xs px-2 py-1 bg-gray-700 text-emerald-400 rounded-md">
              {tag}
            </span>
          ))}
          {post.tags?.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-md">
              +{post.tags.length - 3}
            </span>
          )}
        </div>
        <a href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
            {post.title}
          </h3>
        </a>
        <p className="text-gray-300 mb-4 flex-grow capitalize">{post.description}</p>
        <div className="flex items-center text-sm text-gray-400 mt-auto pt-4 border-t border-gray-700">
          <div className="flex items-center gap-1 mr-4">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(post.createdAt instanceof Date ? post.createdAt : post.createdAt.toDate()).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </div>
      <div className="px-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button className="cursor-pointer bg-transparent text-gray-400 hover:text-gray-200">
            <Heart />
            {post.likesCount}
          </Button>
          <a href={`/blog/${post.slug}#comments`} className="flex items-center gap-1 text-sm text-gray-400">
            <MessageSquare className="w-5 h-5" />
            <span>12</span>
          </a>
        </div>
        <a href={`/blog/${post.slug}`} className="flex items-center gap-1 text-sm text-gray-400">
          <Eye className="w-5 h-5" />
          <span>Ver</span>
        </a>
      </div>
    </article>
  );
};

export default BlogPostCard;
