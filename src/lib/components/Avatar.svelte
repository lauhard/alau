<script lang="ts">
    import { resolve } from "$app/paths";
    import { getUserState } from "$lib/state/user.svelte";
    import { LucideCircleUserRound, LucideLogIn } from "lucide-svelte";
    let userState = $state(getUserState());
    let { showState = $bindable(false) } = $props<{
        showState: boolean;
    }>();
</script>

<div class="avatar">
    {#if userState.isAuthenticated()}
        <button class="btn btn-account" onclick={(e) => { showState = true}}>
            <LucideCircleUserRound size="3rem" strokeWidth="1px"
            ></LucideCircleUserRound>
        </button>
    {:else}
        <a class="btn btn-login" href={resolve("/auth/login")}>
            <LucideLogIn></LucideLogIn>
        </a>
    {/if}
</div>

<style>
</style>
