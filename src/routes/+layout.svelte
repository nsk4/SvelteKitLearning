<script lang="ts">
    import { applyAction, enhance } from '$app/forms';

    //import { browser, building, dev, version } from '$app/environment';
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
    import type { LayoutData } from './$types';
    import type { ActionData, SubmitFunction } from './login/$types';

    // Environment information
    //$: console.log({ browser, building, dev, version });

    export let data: LayoutData;

    let isLoading = false;
    let error = '';
    let form: ActionData;

    const handleLoginEnhance: SubmitFunction = () => {
        isLoading = true;
        return ({ result }) => {
            isLoading = false;
            error = '';

            if (result.type === 'redirect') {
                form = null;
                applyAction(result);
            }
            if (result.type === 'error') {
                error = result.error.message;
            }
            if (result.type === 'failure') {
                form = result.data as ActionData;
                applyAction(result);
            }
        };
    };
</script>

<svelte:head>
    <style>
        * {
            background-color: #c5c6d0;
        }
    </style>
    <title>Website Name{$page.data.title ? ` - ${$page.data.title}` : ''}</title>
    {#if $page.data.description}
        <meta name="description" content={$page.data.description} />
    {/if}
</svelte:head>

{#if data.user}
    <p>Logged in as {data.user.name}</p>
{/if}

<nav data-sveltekit-preload-data="hover">
    <a href="/">Home</a>
    <a href="/products">Products</a>
    {#if !data.user}
        <a href="/login">Login</a>
    {/if}
</nav>

{#if data.user}
    <button
        on:click={async () => {
            const response = await fetch('/api/logout', { method: 'POST' });
            if (response.ok) {
                invalidateAll();
            }
        }}>Logout (JavaScript)</button
    >

    <form method="POST" action="/login?/logout&redirectTo={$page.url.pathname}" use:enhance>
        <button type="submit">Logout (Form Action)</button>
    </form>
{/if}

<form method="GET" action="/search">
    Search query: <input name="query" /><input type="submit" value="Query" />
</form>

<slot />

<!-- Example of work with form actions -->
{#if !data.user && $page.url.pathname !== '/login'}
    <div>
        <h2>Login form with form actions</h2>
        {#if error}
            <p style="color:red">{error}</p>
        {/if}
        <form
            method="POST"
            action="/login?/login&redirectTo={$page.url.pathname}"
            use:enhance={handleLoginEnhance}
        >
            <label for="username">Username</label><br />
            <input
                id="username"
                name="username"
                placeholder="Username"
                value={form?.username || ''}
            />
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
{/if}
