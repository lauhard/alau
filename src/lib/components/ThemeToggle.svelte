<script lang="ts">
    import { LucideMoon, LucideSun } from "lucide-svelte";


    let theme = $state<string>("light");

    const getSystemTheme = () => {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    };

    $effect(() => {
        // Initialize theme from localStorage or system preference
        theme = localStorage.getItem("theme") ?? getSystemTheme();
        document.documentElement.style.colorScheme = theme;

        // Listen for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            // Only update if user hasn't set a preference
            theme = e.matches ? "dark" : "light";
            document.documentElement.style.colorScheme = theme;
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    });

    const toggleTheme = () => {
        theme = theme === "light" ? "dark" : "light";
        //set theme to local storage
        localStorage.setItem("theme", theme);
        document.documentElement.style.colorScheme = theme;
    };
</script>

<button class="btn btn-theme" onclick={toggleTheme}>
    <div class="theme theme-light" class:active={theme === "light"}>
        <LucideSun></LucideSun>
    </div>
    <div class="theme theme-dark" class:active={theme === "dark"}>
        <LucideMoon></LucideMoon>
    </div>
</button>

<style>
    .btn-theme {
        display: flex;
        justify-content: space-between;
        width: 60px;
        max-width: 60px;
        height: 30px;
        padding: 0;
        border-radius: 100vw;
        border: 2px solid var(--color-ld-accent-500);
        position: relative;

        .theme {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            height: 35px;
            min-height: 35px;
            min-width: 35px;
            width: 35px;
            border-radius: 50%;
            z-index: 100;
            opacity: 5%;
            position: absolute;
            background-color: var(--color-ld-accent-500);
            color: var(--color-black-500);
            left: -10%;
            transition:
                left 300ms ease-in-out,
                opacity 300ms ease-in-out;
        }
    }

    .btn-theme:has(.theme-light.active) {
        .theme-light,
        .theme-dark {
            left: -7%;
            opacity: 100%;
        }
        .theme-dark {
            opacity: 5%;
        }
    }
    .btn-theme:has(.theme-dark.active) {
        .theme-light,
        .theme-dark {
            left: 45%;
            opacity: 100%;
        }
        .theme-light {
            opacity: 5%;
        }
    }
</style>
