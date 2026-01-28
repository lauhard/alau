<script lang="ts">
    import { type Route } from "$lib/routes";
    import { type Snippet } from "svelte";
    import NavigationItem from "./NavigationItem.svelte";
    import { LucideX } from "lucide-svelte";
    let {
        extra,
        routes,
        showState = $bindable(false),
        propsAside,
        ...props
    }: {
        extra?: Snippet;
        routes?: Route[];
        showState: boolean;
        propsAside?: { direction: string };
    } = $props();

    let direction = $derived(propsAside?.direction ?? "left");
    let navElement: HTMLElement;
    let hasFocus = $state(false);

    $effect(() => {
        if (showState && navElement) {
            hasFocus = true;
        }
    });

    const onClickOutside = (element: HTMLElement) => {
        const closeAside = (event: MouseEvent | TouchEvent) => {
            if (!element.contains(event.target as HTMLElement)) {
                showState = false;
            }
        };
        document.addEventListener("click", closeAside, true);
        return () => {
            document.removeEventListener("click", closeAside, true);
        };
    };

    const onKeyDown = () => {
        const closeAside = (event: KeyboardEvent) => {
            if (event.key == "Escape" &&  hasFocus) 
                showState = false;
        };
        document.addEventListener("keydown", closeAside, true);
        return () => {
            document.removeEventListener("keydown", closeAside, true);
        };
    };

    const onClickLI = (element: HTMLLIElement) => {
        const closeAside = (event: MouseEvent) => {
            if (element.contains(event.target as HTMLElement)) {
                showState = false;
            }
        };

        document.addEventListener("click", closeAside, true);
        return () => {
            document.removeEventListener("click", closeAside, true);
        };
    };
</script>

<nav
    bind:this={navElement}
    {...props}
    class="aside-nav"
    tabindex="-1"
    class:left={direction === "left"}
    class:right={direction === "right"}
    class:open={showState === true}
    {@attach onClickOutside}
    {@attach onKeyDown}
>
    <button
        class="btn btn-close"
        onclick={() => {
            if (hasFocus) {
                showState = false;
            }
        }}><LucideX size="1rem"></LucideX></button
    >
    <ul class="aside-nav-items">
        {#each routes as route}
            <NavigationItem classPrefix="aside-" {route} {@attach onClickLI}></NavigationItem>
        {/each}
    </ul>
    {@render extra?.()}
</nav>

<style>
</style>
