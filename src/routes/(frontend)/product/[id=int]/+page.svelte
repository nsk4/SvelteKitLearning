<script>
    import { page } from '$app/stores';
    import ProductHeader from './ProductHeader.svelte';

    $: console.log($page);
</script>

<ProductHeader></ProductHeader>

<p>Product ID: {$page.params.id}</p>

<a href="/product/321">Other product</a>
