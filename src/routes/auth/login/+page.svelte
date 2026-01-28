<script lang="ts">
    import { authClient } from "$lib/betterauth/auth-client";
    import { goto, invalidateAll } from "$app/navigation";
    import type { ActionData } from "./$types";
    import FormError from "$lib/components/FormError.svelte";
    import Form from "$lib/components/Form.svelte";
    import Error from "$lib/components/Error.svelte";
    import { resolve } from "$app/paths";

    let { form }: { form: ActionData } = $props();
    let email = $state<string>("");
    let password = $state<string>("");
    let betterAuthError = $state<string | null>(null);

    export const signIn = async () => {
        await authClient.signIn.email(
            {
                password,
                email,
            },
            {
                onSuccess: async (data) => {
                    await invalidateAll();
                    goto("/");
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

<article class="login">
    <Form fn={signIn} action={"?/login"} method="POST" classPrefix="login-">
        {#snippet form()}
            <h2>KeepTrack</h2>
            <label for="login_email"
                >Email
                <input
                    type="email"
                    bind:value={email}
                    name="email"
                    id="login_email"
                    autocomplete="email"
                    required
                />
                <FormError {form} formField={"email"}></FormError>
            </label>
            <label for="login_password"
                >Password
                <input
                    type="password"
                    bind:value={password}
                    name="password"
                    id="login_password"
                    autocomplete="current-password"
                    required
                />
                <FormError {form} formField={"password"}></FormError>
            </label>
            {#if betterAuthError}
                <Error message={betterAuthError}></Error>
            {/if}
            <a class="forgot-password" href="#">Forgot Password?</a>
            <div class="action-wrapper">
                <button class="btn btn-login" type="submit">Login</button>
                <fieldset class="divider-signup">
                    <legend>OR</legend>
                    <a class="btn signup" href={resolve("/auth/signup")}
                        >Signup</a
                    >
                </fieldset>
            </div>
        {/snippet}
    </Form>
</article>

<style>
    /* Hide browser extension injected elements */
    .login {
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
    }
    .forgot-password {
        display: block;
        width: 100%;
    }
    .action-wrapper {
        display: flex;
        flex-direction: column;
        justify-self: center;
        margin-top: 1.5rem;
        width: 100%;
        .btn,
        button {
            border-radius: 30px;
        }
        .signup {
            border: 2px solid var(--color-ld-white-700);
            color: var(--color-ld-black-700);
            &:hover {
                border: 2px solid var(--color-ld-accent-600);
                color: var(--color-ld-accent-600);
            }
        }
        .divider-signup {
            margin: 0;
            padding: 0;
            margin-top: 1.2rem;
            padding-top: 1.2rem;
            border: none;
            border-top: 1px solid var(--color-ld-accent-600);
            border-radius: 0;
            justify-self: center;
            width: 100%;
            display: block;
            legend {
                width: fit-content;
                padding-inline: 20px;
                display: flex;
                justify-self: center;
                text-align: center;
                font-weight: bold;
                color: var(--color-ld-black-700);
            }
        }
    }
</style>
