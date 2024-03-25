import type { HandleClientError } from "@sveltejs/kit";

export const handleError: HandleClientError = ({ error, event }) => {
    console.log("This is coming from client handleError.");
    console.log(error, event); // Send this to sentry for any error logging service.

    return {
        message: "An unexpected error has occured.",
        code: "UNEXPECTED"
    };
};