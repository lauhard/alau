import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import type { Handle } from "@sveltejs/kit";
import { auth, database } from "$lib/betterauth/auth";
import { checkRuntime, isDev } from "$lib";
import { db } from "$lib/server/db";
import { sequence } from "@sveltejs/kit/hooks";

export const authHandler: Handle = async ({ event, resolve }) => {
    const session = await auth.api.getSession({
        headers: event.request.headers,
    });
    // Make session and user available on server
    if (session) {
        event.locals.session = session.session;
        event.locals.user = session.user;
    }
    database(db(event.platform)); // initialize database connection
    return svelteKitHandler({ event, resolve, auth, building });
};

export const hooks = sequence(authHandler);

