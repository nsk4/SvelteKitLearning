import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess({
        scss: {}
    }),

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter(),
        alias: {
            $components: 'src/lib/components'
        },
        prerender: {
            crawl: false,
            entries: ['*', '/product/1']
            // If we set crawl to false means no crawling for prerendering, that means we need to specify in entries the pages to crawl through
            //entries: ['/', '/products', '/api/random-number', '/product/7']
        }
    }
};

export default config;
