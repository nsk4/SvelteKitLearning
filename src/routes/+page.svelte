<script>
    import { goto, preloadData } from '$app/navigation';
</script>

<h1>Home</h1>

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
