import { House, ShieldUser, User, Settings2, type Icon as IconType } from 'lucide-svelte'
export interface Route {
    path?: string;
    fn?: (callback?: () => void) => void | Promise<void>;
    style?: string;
    name: string;
    icon?: typeof IconType | undefined;
    public?: boolean;
    role?: string;
    subRoutes?: Route[];
}

export const routes = [
    {
        path: '/',
        name: 'Home',
        icon: House,
        public: true,
    },
    {
        path: '/voucher',
        name: 'Belege',
        icon: ShieldUser,
        public: false,
        role: 'user',
    },

] as Route[];

export const accountRoutes = [
    {
        path: '/profile/account',
        name: 'Account',
        icon: User,
        public: false,
        role: 'user',
    },
    {
        path: '/profile/settings',
        name: 'Settings',
        icon: Settings2,
        public: false,
        role: 'user',
    }
] as Route[];