<script lang="ts">
    export let data;
    $: product = data.product;
</script>

<h1>{product?.title}</h1>
<p>{product?.description}</p>
<img src={product?.thumbnail} alt={product?.title} />

<div>
    Comments
    {#await data.comments}
        Loading...
    {:then data}
        {#each data.comments as comment}
            <p>{comment.body}</p>
        {/each}
    {/await}
</div>

<style>
    img {
        width: 50%;
    }
</style>
