import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { auth } from "$lib/betterauth/auth";
import { dbInit } from "$lib/server/db";
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";

const authHandle:Handle = async ({ event, resolve }) => {
    const db = dbInit(event.platform);
    const bauth = auth(db);
    const session = await bauth.api.getSession({
        headers: event.request.headers,
    });
    //// Make session and user available on server
    if (session) {
        event.locals.session = session.session;
        event.locals.user = session.user;
    }
    //console.log("Auth Handler - Runtime:", checkRuntime, "Dev Mode:", isDev);
    return svelteKitHandler({ event, resolve, auth:bauth, building });
    //return await resolve(event);
};

export const handle = sequence(authHandle);


