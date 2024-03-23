import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ cookies }) => {

    const token = cookies.get("token");
    // get the user from token
    const user = { name: "john", id: 1 };
    return { user: token ? user : null };
};