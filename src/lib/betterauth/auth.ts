import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { Platform } from "../../app";
import { admin } from "better-auth/plugins";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { dbInit, type DBType } from "$lib/server/db";

export const auth = (db: DBType) => {
    return betterAuth({
        database: drizzleAdapter(db, {
            provider: "sqlite", // or "mysql", "sqlite"
        }),
        emailAndPassword: {
            enabled: true,
            autoSignIn: false
        },
        plugins: [
            sveltekitCookies(getRequestEvent), // make sure that cookies are properly set when calling signIn/signOut
            admin(),
        ],
        trustedOrigins: [
            'http://localhost:5173',
            'http://localhost:8787',
            'https://www.mbm.cx'
        ]
    });
}
export type Auth = ReturnType<typeof auth>;
export type Session = Auth["$Infer"]["Session"]["session"];
export type User = Auth["$Infer"]["Session"]["user"];