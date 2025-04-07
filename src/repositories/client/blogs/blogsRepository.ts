import {
    collection,
    getDocs,
    limit,
    query,
    startAfter,
    where,
    type QueryConstraint,
    orderBy
} from "firebase/firestore";
import type { Post, ResponsePostWithCategory } from "../../../interfaces/Post";
import { firestore } from "@/config/firebase/client";

export class BlogsRepository {
    async getBlogsWithCategory(
        category: string | null,
        lastDoc: Post | null,
        page: number,
        tags: string[] | null = null
    ): Promise<ResponsePostWithCategory> {
        try {
            const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];

            if (category) {
                constraints.push(where("categories", "==", category));
            }

            console.log("esto es la categoria", category)
            console.log("esto son los tags", tags)

            if (tags && tags.length > 0) {
                constraints.push(where("tags", "array-contains-any", tags));

            }


            const perPage = 6;

            if (page > 1) {
                if (!lastDoc || !lastDoc.createdAt) {
                    throw new Error("No hay más blogs referente a esta categoría.");
                }

                constraints.push(startAfter(lastDoc.createdAt));
            }

            constraints.push(limit(perPage));

            console.log("esto son los contrains", constraints)

            const q = query(collection(firestore, "blogs"), ...constraints);
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error(
                    page > 1
                        ? "No hay más blogs referente a esta categoría"
                        : "No hay blogs referente a esta categoría"
                );
            }

            // Verificamos si hay documentos en la consulta


            // Guardamos los documentos consultados para la paginación futura
            const newDocs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Post[];

            return {
                lastVisible: newDocs.length ? newDocs[newDocs.length - 1] : null,
                data: newDocs
            };
        } catch (error) {
            console.error("Error en getBlogsWithCategory:", error);
            throw new Error(
                error instanceof Error
                    ? error.message
                    : "Hubo un error al traer los blogs por categoría",
                { cause: error }
            );
        }
    }
}
