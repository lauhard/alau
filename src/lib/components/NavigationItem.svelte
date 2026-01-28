<script lang="ts">
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import { getUserState } from "$lib/state/user.svelte";
    import type { User } from "$lib/betterauth/auth";
    import { type Route } from "$lib/routes";

    let {
        route,
        classPrefix = "",
        ...props
    }: {
        route: Route;
        classPrefix?: string;
    } = $props();

    let userState = $state(getUserState());
    let user = $derived(userState.userInfo) as User;

    const isNavItemActive = (routePath: string) => {
        if (
            page.url.pathname == routePath ||
            (page.url.pathname.includes(routePath.toLowerCase()) &&
                routePath.toLowerCase() != "/")
        ) {
            return true;
        }
    };

    const showNavItem = (route: Route): boolean => {
        if (!route.public) {
            return user?.role === route.role && userState.isAuthenticated()
                ? true
                : false;
        } else {
            return true;
        }
    };

</script>

{#snippet GetIconFromRoute(route: Route)}
    {#if route?.icon != undefined}
        {@const Icon = route.icon}
        <Icon size="1.5rem" />
    {/if}
{/snippet}

{#if showNavItem(route)}
    <li
        class="{classPrefix}nav-item"
        class:active={route.path ? isNavItemActive(route.path) === true : false}
        data-hasList={route?.subRoutes ? "true" : "false"}
        data-route-name={route.name}
        {...props}
    >
        <a class="{classPrefix}nav-link" href={resolve(route.path as any)}>
            {@render GetIconFromRoute(route)}
            {route.name}
        </a>
    </li>
{/if}

<style>
</style>
