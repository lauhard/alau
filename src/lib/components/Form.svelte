<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { type ActionResult, type SubmitFunction } from "@sveltejs/kit";
    import type { Snippet } from "svelte";

    let {
        form,
        fn,
        action,
        method = "POST",
        classPrefix = "",
        ...props
    }: {
        form: Snippet;
        fn: () => Promise<void>;
        action: string;
        method: any;
        classPrefix?: string;
    } = $props();
    let betterAuthError = $state<string | null>(null);

    const submitFunction: SubmitFunction = (event) => {
        return async ({ result }: { result: ActionResult }) => {
            await applyAction(result);
            if (result.type === "success" && result.data?.success === true) {
                // handle successful signup, e.g., redirect or show a message
                await fn();
            }
        };
    };
</script>

<form
    class="{classPrefix}form"
    onsubmit={() => (betterAuthError = null)}
    {action}
    use:enhance={submitFunction}
    {method}
    {...props}
>
    <fieldset>
        {@render form()}
    </fieldset>
</form>
