import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const productResponse = await fetch(`https://dummyjson.com/products/${params.id}`);
    if (!productResponse.ok) {
        throw error(productResponse.status, { message: "Failed to load product!", code: "NOT_FOUND" });
    }
    const product = await productResponse.json();
    const comments = fetch("https://dummyjson.com/comments/").then((res) => res.json());
    return {
        product,
        title: product.title,
        description: product.description,
        comments
    };
};