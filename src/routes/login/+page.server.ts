import { type Actions, fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
    login: async ({ request, cookies, url, locals }) => {
        const form = await request.formData();

        const username = form.get("username");
        const password = form.get("password");

        // Simulate delay in authentication
        await new Promise(resolve => { setTimeout(resolve, 1000); });

        // Simulate a processing error
        if (username === "error") {
            throw new Error("Test error");
        }

        if (!username) {
            return fail(400, { usernameMissing: true });
        }
        if (!password) {
            return fail(400, { passwordMissing: true, username });
        }

        cookies.set("token", "token_value", { path: "/" });
        // This is done automatically in the handle hook in hooks.server.ts. This is not guaranted to happen in all situations, so it is safer to manually set it here as well.
        locals.user = { name: "john", id: 1 };

        throw redirect(303, url.searchParams.get("redirectTo") || "/");
    },
    logout: ({ cookies, url, locals }) => {
        cookies.delete("token", { path: "/" });
        // This is done automatically in the handle hook in hooks.server.ts. This is not guaranted to happen in all situations, so it is safer to manually set it here as well.
        locals.user = undefined;
        throw redirect(303, url.searchParams.get("redirectTo") || "/");
    }
};