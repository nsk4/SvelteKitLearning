<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';

    export let data;
</script>

<svelte:head>
    <title>Website Name{$page.data.title ? ` - ${$page.data.title}` : ''}</title>
    {#if $page.data.description}
        <meta name="description" content={$page.data.description} />
    {/if}
</svelte:head>

{#if data.user}
    <p>Logged in as {data.user.name}</p>
{/if}

<nav>
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
        }}>Logout</button
    >
{/if}

<slot />
