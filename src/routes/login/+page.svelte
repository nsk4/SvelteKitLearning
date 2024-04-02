<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import type { Snapshot, ActionData } from './$types';

    let username = '';
    let password = '';

    export const snapshot: Snapshot<{ username: string; password: string }> = {
        capture: () => {
            return {
                username,
                password
            };
        },
        restore: (value) => {
            username = value.username;
            password = value.password;
        }
    };

    // Example of form without form actions
    const login = async () => {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        const responseJSON = await response.json();
        if (response.ok) {
            // invalidateAll will trigger redirect we have in +page.ts so manual goto is not needed.
            //goto('/', {
            //    invalidateAll: true
            //});
            invalidateAll();
        } else {
            alert(responseJSON.message);
        }
    };

    // Example of work with form actions
    // Form prop will be populated only in this page since only this route has form logic in page.server.ts.
    export let form: ActionData;

    let isLoading = false;
    let error = '';
</script>

<!-- Example of form without form actions -->
<div>
    <h2>Login form without form actions</h2>
    <form on:submit|preventDefault={login}>
        <label for="username1">Username</label><br />
        <input bind:value={username} id="username1" name="username" placeholder="Username" />
        <br /><br />

        <label for="password1">Password</label><br />
        <input
            bind:value={password}
            id="password1"
            name="password"
            placeholder="Password"
            type="password"
        />
        <br /><br />

        <button type="submit">Login</button>
    </form>
</div>

<!-- Example of work with form actions -->
<div>
    <h2>Login form with form actions</h2>
    {#if error}
        <p style="color:red">{error}</p>
    {/if}
    <form
        method="POST"
        action="?/login"
        use:enhance={({ formData, formElement, action }) => {
            console.log(formData, formElement, action);

            isLoading = true;
            return ({ result }) => {
                console.log(result);
                isLoading = false;
                error = '';

                // Update executes default enhance behaviour such as redirects. We should call it if we do not have our custom logic.
                //update();

                if (result.type === 'failure' || result.type === 'redirect') {
                    // Apply action can be used to manually control what to do under different result types.
                    applyAction(result);
                }

                // Default action for error is to open an error page.
                if (result.type === 'error') {
                    error = result.error.message;
                }
            };
        }}
    >
        <label for="username">Username</label><br />
        <input id="username" name="username" placeholder="Username" value={form?.username || ''} />
        {#if form?.usernameMissing}
            <p style="color:red; margin-bottom:0">Username is Required!</p>
        {/if}
        <br /><br />

        <label for="password">Password</label><br />
        <input id="password" name="password" placeholder="Password" type="password" />
        {#if form?.passwordMissing}
            <p style="color:red; margin-bottom:0">Password is Required!</p>
        {/if}
        <br /><br />

        <button type="submit" disabled={isLoading}>Login</button>
    </form>
</div>
