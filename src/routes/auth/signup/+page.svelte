<script lang="ts">
    import { authClient } from "$lib/betterauth/auth-client";
    import { goto, invalidateAll } from "$app/navigation";
    import type { ActionData } from "./$types";
    import Form from "$lib/components/Form.svelte";
    import FormError from "$lib/components/FormError.svelte";
    import Error from "$lib/components/Error.svelte";

    let { form }: { form: ActionData } = $props();
    let name = $state<string>("");
    let email = $state<string>("");
    let password = $state<string>("");
    let betterAuthError = $state<string | null>(null);

    const signUp = async () => {
        await authClient.signUp.email(
            {
                name,
                password,
                email,
            },
            {
                onSuccess: async (data) => {
                    await invalidateAll();
                    goto("/auth/login");
                },
                onError: async (error) => {
                    betterAuthError =
                        error instanceof Error
                            ? error.error.code
                            : String(error.error.message);
                },
            },
        );
    };
</script>

<article class="signup">
    <Form fn={signUp} action={"?/signup"} method="POST" classPrefix="login-">
        {#snippet form()}
            <h2>KeepTrack</h2>
            <label for="signup_name"
                >Name
                <input
                    type="text"
                    bind:value={name}
                    name="name"
                    id="signup_name"
                    required
                />
                <FormError {form} formField={"name"}></FormError>
            </label>
            <label for="signup_email"
                >Email
                <input
                    type="email"
                    bind:value={email}
                    name="email"
                    id="signup_email"
                    required
                />
                <FormError {form} formField={"email"}></FormError>
            </label>
            <label for="signup_password"
                >Password
                <input
                    type="password"
                    bind:value={password}
                    name="password"
                    id="signup_password"
                    autocomplete="new-password"
                    required
                />
                <FormError {form} formField={"password"}></FormError>
            </label>
            {#if betterAuthError}
                <Error message={betterAuthError}></Error>
            {/if}
            <div class="action-wrapper">
                <button class="btn btn-signup" type="submit">Signup</button>
            </div>
        {/snippet}
    </Form>
</article>
{#snippet error(message: string)}
    <div class="alert alert-danger">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-triangle-alert-icon lucide-triangle-alert"
            ><path
                d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
            /><path d="M12 9v4" /><path d="M12 17h.01" /></svg
        >
        {message}
    </div>
{/snippet}

{#snippet fromError(errors: any, field: string)}
    {#if errors && errors[field]}
        {#each errors[field].errors as message}
            <div class="alert alert-danger">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-triangle-alert-icon lucide-triangle-alert"
                    ><path
                        d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
                    /><path d="M12 9v4" /><path d="M12 17h.01" /></svg
                >
                {message}
            </div>
        {/each}
    {/if}
{/snippet}

<style>
    /* Hide browser extension injected elements */
    :global(.json-formatter-container) {
        display: none !important;
    }

    .signup {
        display: grid;
        place-items: center;
        min-width: 300px;
        max-height: max-content;
        max-width: 500px;
        width: 100%;
        height: 100%;

        h2 {
            font-family: var(--san-serif);
            text-align: center;
            color: var(--color-ld-black-700);
        }
        label {
            line-height: 1.8rem;
            input {
                font-weight: normal;
            }
        }
        .action-wrapper {
            display: flex;
            flex-direction: column;
            justify-self: center;
            margin-top: 1.5rem;
            width: 100%;
            button {
                border-radius: 30px;
            }
        }
    }
</style>
