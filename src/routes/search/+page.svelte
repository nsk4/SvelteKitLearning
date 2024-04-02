<script lang="ts">
    import { page } from '$app/stores';
</script>

<h2>Search results for: {$page.url.searchParams.get('query')}</h2>
