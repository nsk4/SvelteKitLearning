<script lang="ts">
    import { goto, preloadData } from '$app/navigation';
    import { onMount } from 'svelte';

    // onMount will run even on static pages
    let data: string[] = [];
    onMount(() => {
        setTimeout(() => {
            data = ['Data 1', 'Data 2'];
        });
    });
</script>

<h1>Home</h1>

{#if data.length > 0}
    Example of dynamic data in prerendered page:
    <ul>
        {#each data as item}
            <li>{item}</li>
        {/each}
    </ul>
{/if}

<button
    on:focus={() => {}}
    on:mouseover={async () => {
        await preloadData('/products');
    }}
    on:click={() => {
        goto('/products');
    }}
>
    Products
</button>
