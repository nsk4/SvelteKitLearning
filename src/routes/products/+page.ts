import type { PageLoad } from './$types';
//import { env } from '$env/dynamic/public'; // These will be available depending on how the deployment system handles .env file. This is dynamically evaluated at runtime.
//import { PUBLIC_KEY } from "$env/static/public"; // These will always be available regardless deployment system. This is dynamically evaluated at buildtime.

export const load: PageLoad = async ({ data }) => {
    // When using dynamic env variables from client the request has to be sent to the server which can cause network delays. Static variables do not have this issue.
    //console.log('$env/dynamic/public at +page.ts', env.PUBLIC_KEY);
    //console.log('$env/static/public at +page.ts', PUBLIC_KEY);

    return {
        products: data.products,
        title: "Products List"
    };
};