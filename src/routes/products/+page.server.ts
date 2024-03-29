import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
//import { env as privateEnv } from '$env/dynamic/private'; // These will be available depending on how the deployment system handles .env file. This is dynamically evaluated at runtime.
//import { API_KEY } from "$env/static/private"; // These will always be available regardless deployment system. This is dynamically evaluated at buildtime.
//import { env as publicEnv } from '$env/dynamic/public'; // These will be available depending on how the deployment system handles .env file. This is dynamically evaluated at runtime.
//import { PUBLIC_KEY } from "$env/static/public"; // These will always be available regardless deployment system. This is dynamically evaluated at buildtime.

export const load: PageServerLoad = async ({ fetch, depends, locals }) => {
    //console.log('$env/dynamic/private at +page.server.ts', privateEnv.API_KEY);
    //console.log('$env/static/private at +page.server.ts', API_KEY);
    //console.log('$env/dynamic/public at +page.server.ts', publicEnv.PUBLIC_KEY);
    //console.log('$env/static/public at +page.server.ts', PUBLIC_KEY);

    console.log("products/locals", locals);

    const response = await fetch("/api/products");
    depends("app:productsServerLoad");
    if (response.ok) {
        return {
            products: await response.json()
        };
    }

    const errorJSON = await response.json();
    throw error(response.status, errorJSON.message);
};

// Endpoint will run once during build time and the results will be baked into the generated file. If products changes after build this will not be reflected in the generated file.
export const prerender = true;