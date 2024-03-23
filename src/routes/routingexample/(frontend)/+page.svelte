<script>
    import { goto, beforeNavigate, afterNavigate } from '$app/navigation';
    import { navigating } from '$app/stores';

    $: console.log('nav', $navigating);

    beforeNavigate((navigation) => {
        console.log('beforeNavigate', navigation);
    });
    afterNavigate((navigation) => {
        console.log('afterNavigate', navigation);
    });
</script>

<h1>Home</h1>

<button
    on:click={() => {
        goto('/about');
    }}
    >Go to About
</button>
