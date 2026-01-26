
export const isDev = import.meta.env.DEV;
export const isServer =  typeof window === 'undefined' ? true : false;


export type Runtime = 'node' | 'cloudflare';
export const checkRuntime: Runtime =
	(isDev ? 'node' : 'cloudflare');