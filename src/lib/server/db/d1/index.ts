
import { drizzle } from "drizzle-orm/d1";
import type { Platform } from "../../../../app";
import * as schema from './schema/index.ts';

export const d1 = (platform: Platform): ReturnType<typeof drizzle<typeof schema>> => {
    try {
        if (!platform?.env?.alau) {
            console.error("[d1] platform.env.alau is undefined!", { env: platform?.env });
            throw new Error("Cloudflare D1 binding 'alau' is missing from platform.env");
        }
        return drizzle(platform.env.alau, { schema });
    } catch (err) {
        console.error("[d1] Error initializing drizzle-orm/d1:", err);
        throw err;
    }
}