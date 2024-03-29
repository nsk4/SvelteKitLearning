import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ locals }) => {
    // get the user from token
    const user = locals.user;
    return { user };
};

export const trailingSlash = "never";