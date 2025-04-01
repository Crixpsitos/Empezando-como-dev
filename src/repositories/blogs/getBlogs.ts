import { db } from "../../config/firebase/admin"; // Ya inicializaste arriba
import { QuerySnapshot } from 'firebase-admin/firestore';
import type { Post } from "../../interfaces/Post";

export class BlogsRepository {
    async getBlogs(limit?: number): Promise<Post[]> {
        try {
            const blogsRef = db.collection('blogs');
            let queryRef;

            if (limit) {
                queryRef = blogsRef.orderBy('createdAt', 'desc').limit(limit);
            } else {
                queryRef = blogsRef.orderBy('createdAt', 'desc');
            }

            const querySnapshot: QuerySnapshot = await queryRef.get();

            const blogs = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    categories: data.categories,
                    content: data.content,
                    coverImage: data.coverImage,
                    createdAt: data.createdAt,
                    description: data.description,
                    status: data.status,
                    slug: data.slug,
                    tags: data.tags,
                    title: data.title,
                    updatedAt: data.updatedAt,
                    likesCount: data.likesCount,
                    metaDescription: data.metaDescription,
                    metaTitle: data.metaTitle,
                    readingTime: data.readingTime,
                    viewsCount: data.viewsCount
                } as unknown as Post;
            });

            return blogs;
        } catch (error) {
            console.error('Error en getBlogs:', error);
            throw new Error('Hubo un error al traer los blogs');
        }
    }
}
