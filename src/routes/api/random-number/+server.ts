import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    return new Response(String(Math.random() * 10));
};

// If we use prerender then the function will be evaluated at build time and baked into the file.
export const prerender = true;