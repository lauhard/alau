// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Session, User } from '$lib/betterauth/auth';
declare global {
	namespace App {
        interface Locals {
			session: Session,
			user: User
		}
		interface Platform {
			env: Env
			cf: CfProperties
			ctx: ExecutionContext
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: { default: Cache } & CacheStorage
		}
    }
}

export {Locals, Platform} from './app';