import { goto, invalidateAll } from "$app/navigation";
import { resolve } from "$app/paths";
import type { Pathname } from "$app/types";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient({
    plugins: [
        adminClient()
    ]
});

export const signout = async (url:any) => {
    authClient.signOut({
        fetchOptions: {
            onSuccess: async () => {
                await invalidateAll();
                goto(url || resolve('/') as Pathname);
            },
        },
    });
};