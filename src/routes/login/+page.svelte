<script lang="ts">
    import { goto, invalidateAll } from '$app/navigation';
    import type { Snapshot } from '../$types';

    let a: any;

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
</script>

<form on:submit|preventDefault={login}>
    <label for="username">Username</label><br />
    <input bind:value={username} id="username" name="username" placeholder="Username" />
    <br /><br />

    <label for="password">Password</label><br />
    <input
        bind:value={password}
        id="password"
        name="password"
        placeholder="Password"
        type="password"
    />
    <br /><br />

    <button type="submit">Login</button>
</form>