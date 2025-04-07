import type { Timestamp } from "firebase-admin/firestore";

export interface Post {
    length: number;
    categories: string;
    content: string;
    coverImage: string;
    createdAt: Date | Timestamp;
    description: string;
    likesCount: number;
    metaDescription: string;
    metaTitle: string;
    readingTime: string;
    slug: string;
    status: string;
    tags: string[];
    title: string;
    updatedAt: Timestamp;
    viewsCount: number;
    id: string
}


export interface ResponsePostWithCategory {
    data: Post[]
    lastVisible: Post | null
}