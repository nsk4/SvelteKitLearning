import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ fetch }) => {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
        throw error(response.status, response.statusText);
    }
    const responseJSON = await response.json();
    return json(responseJSON, { status: 200 });
};

export const POST: RequestHandler = async ({ request }) => {
    const product = await request.json();
    if (!product.title) {
        throw error(400, "Product title is required!");
    }
    return json({ id: 123, title: product.title });
};