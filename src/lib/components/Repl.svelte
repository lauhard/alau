<script lang="ts">
    import { LucidePlay } from "lucide-svelte";

    let { url }:{url:string}=$props();

    let loading = $state(false);
    let showIframe = $state(false);
    let progress = $state(0);
    let interval: ReturnType<typeof setInterval>;
    let iframeLoaded = $state(false);

    $effect(() => {console.log("loading ", loading)});
    const showRepl = () => {
        interval = setInterval(() => {
            if (iframeLoaded) {
                // Fast finish when iframe has loaded
                console.log("progress: ", progress);
                if (progress < 98) progress = Math.min(100, progress + 2);
                else {
                    progress = Math.min(100, progress + 0.2);
                }
                if (progress >= 100) {
                    loading = false;
                    clearInterval(interval);
                }
            }
        }, 60);
        return () => clearInterval(interval);
    };
    function handleLoad() {
        // Add delay for REPL JavaScript to initialize after iframe document loads
        setTimeout(() => {
            iframeLoaded = true;
        }, 500);
    }
</script>

<div class="iframe-container">
    {#if !loading && !showIframe}
        <button
            class="btn btn-play"
            onclick={(e:MouseEvent) => {
                loading = true;
                showRepl();
                showIframe = true;
            }}
        >
            <LucidePlay size="3rem"></LucidePlay></button
        >
     {/if}
    {#if loading}
        <div class="loading-overlay">
            <div class="spinner"></div>
            <p class="loading-text">Loading REPL...</p>
            <p class="counter">{Math.round(progress)}%</p>
        </div>
    {/if}
    {#if showIframe}
        <iframe
            title="Svelte REPL (embed)"
            src="{url}"
            class="repl"
            loading="eager"
            allow="clipboard-write; fullscreen"
            onload={handleLoad}
        ></iframe>
        <a
            class="btn btn-goto-playground"
            target="_blank"
            href="https://svelte.dev/playground/319a0693a4054edcbfda2cac9b9ec84e?version=5.48.0"
        >
            Go to Playground
        </a>
    {/if}
</div>

<style>
    .iframe-container {
        position: relative;
        max-width: 100%;
        height: 580px;
        overflow: hidden;
        border-radius: 12px;
        background: linear-gradient(
            135deg,
            #1a1a2e 0%,
            #16213e 50%,
            var(--color-ld-accent-700) 200%
        );
    }
    .btn-play {
        padding: 0px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border-width: 0.3rem;
        color: var(--color-ld-accent-500);
        border-color: var(--color-ld-accent-500);
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
    }
    .btn-goto-playground{
        color: var(--color-ld-accent-500);
        margin-top:-8px;
        border:none;
        border-radius: 0;
        justify-content: center;
        align-items: center;
        display:flex;
        height: 60px;
        background-color: var(--color-ld-white-400);

    }
    .repl {
        width: 100%;
        height: 520px;
        border: 0;
        border-radius: 12px 12px 0 0;
        margin: 0 !important;
        padding: 0;
    }

    .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 520px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: linear-gradient(
            135deg,
            #1a1a2e 0%,
            #16213e 50%,
            var(--color-ld-accent-700) 200%
        );
        border-radius: 12px 12px 0 0;
        z-index: 10;
        gap: 1rem;
    }

    .spinner {
        width: 60px;
        height: 60px;
        border: 4px solid var(--color-ld-black-500);
        border-top: 4px solid var(--color-ld-accent-700);
        border-right: 4px solid var(--color-ld-accent-500);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .loading-text {
        color: #fff;
        font-size: 1.2rem;
        font-weight: 500;
        margin: 0;
        opacity: 0.9;
        animation: pulse 2s ease-in-out infinite;
    }

    .counter {
        color: var(--color-ld-accent-500);
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
        font-variant-numeric: tabular-nums;
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 0.7;
        }
        50% {
            opacity: 1;
        }
    }
</style>
