<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
</script>

<h1>About</h1>

{JSON.stringify($page.params)}

<button
    on:click={() => {
        goto('/');
    }}
>
    Go to Home
</button>
