<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount, type Snippet } from "svelte";

    let {
        children,
        width,
        speed,
        direction,
    }: { children: Snippet; speed?: string; direction?: string; width?: string } =
        $props();

    let innerScroller: HTMLUListElement | undefined =
        $state<HTMLUListElement>();

    let matchMedaia = browser
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    onMount(() => {
        if (!innerScroller) return;
        const sponsorListItems = Array.from(innerScroller.children);
        sponsorListItems.forEach((item) => {
            const duplicateItem = item.cloneNode(true) as HTMLLIElement;
            duplicateItem.setAttribute("aria-hidden", "true");
            innerScroller?.appendChild(duplicateItem);
        });
    });
</script>

<div
    class="scroller"
    data-animated={matchMedaia?.matches ? "false" : "true"}
    style={width ? `--horizontal-scroller-width: ${width};` : ""}
>
    <ul
        bind:this={innerScroller}
        style="{speed ? `--horizontal-scroller-animation-speed: ${speed};` : ''} 
        {direction ? `--horizontal-scroller-animation-direction: ${direction};` : ''}
        "
        class="sponsor-list inner-scroller"
    >
        {@render children()}
    </ul>
</div>

<style>
    :root{
        --padding-block: 1rem;
        --animation-fix-padding: .5rem;
    }
    .scroller {
        /* border: 3px solid red; */
        max-width: var(--horizontal-scroller-width, 100%);
        width: 100%;
    }
    .inner-scroller {
        margin: 0;
        padding: 0;
        padding-block: var(--padding-block);
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        justify-content: flex-start;
        list-style: none;
    }
    .scroller[data-animated="true"] {
        overflow: clip;
        mask: linear-gradient(
            90deg,
            transparent,
            #fff 20%,
            #fff 80%,
            transparent
        );
    }
    .scroller[data-animated="true"] .inner-scroller {
        width: fit-content;
        flex-wrap: nowrap;
        animation-direction: var(--horizontal-scroller-animation-direction, forwards);
        animation-name: scroll-animation;
        animation-duration: var(--horizontal-scroller-animation-speed, 30s);
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-play-state: running;
        animation-fill-mode: forwards;
    }
    .scroller[data-animated="true"] .inner-scroller:hover {
        animation-play-state: paused;
    }

    @keyframes scroll-animation {
        to {
            transform: translate(
                calc(-50% - var(--animation-fix-padding))
            );
        }
    }
</style>