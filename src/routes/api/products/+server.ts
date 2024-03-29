import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ fetch }) => {
    const response = await fetch('https://dummyjson.com/products?limit=6');
    if (!response.ok) {
        throw error(response.status, response.statusText);
    }
    const responseJSON = await response.json();
    return json(responseJSON, { status: 200 });
};

// Commented out for testing purposes. If page is set to be prerendered then it should not request from API endpoints that contain endpoints other than GET. In our example the products.ts is requesting GET endpoint from this file. Since this file also contains POST the prerendering will throw an error.
//export const POST: RequestHandler = async ({ request }) => {
//    const product = await request.json();
//    if (!product.title) {
//        throw error(400, "Product title is required!");
//    }
//    return json({ id: 123, title: product.title });
//};

export const trailingSlash = "never";