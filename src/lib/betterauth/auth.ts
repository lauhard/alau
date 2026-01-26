import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { Platform } from "../../app";
import { db } from "$lib/server/db";
import { admin } from "better-auth/plugins";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";


export const database = (platform: Platform) => db(platform);
export const auth = betterAuth({

    database: drizzleAdapter(database, {
        provider: "sqlite", // or "mysql", "sqlite"
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false
    },
    plugins: [
        admin(),
        sveltekitCookies(getRequestEvent) // make sure that cookies are properly set when calling signIn/signOut
    ],
    trustedOrigins: [
        'http://localhost:5173',
        'http://localhost:8787',
        'https://alau.lauhard.workers.dev'
    ]
});