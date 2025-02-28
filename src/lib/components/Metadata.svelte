<script lang="ts">
    import { siteUrl } from "$lib/config";

    export let title: string = 'Spyder';
    export let description: string = '';
    export let keywords: string = '';
    export let author: string = '';
    export let url: string = '';
    export let image: string = '';
    export let prism: boolean = false;

    const site = `@Spyder_IDE`;
    $: untrailedUrl = url?.replace(/\/+$/, '') || '';
    $: absoluteUrl = untrailedUrl.startsWith('http') ? untrailedUrl : `${siteUrl}${untrailedUrl}`;
    $: absoluteImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
</script>

<svelte:head>
    <meta name="robots" content="index, follow" />
    <!-- Essential Meta Tags -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content={author} />
    <link rel="canonical" href={absoluteUrl} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Spyder IDE" />
    <meta property="og:url" content={absoluteUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={absoluteImage} />
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_US" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={site} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={absoluteImage} />
    <meta name="twitter:image:alt" content={title} />

    <!-- Additional Meta -->
    {#if prism}
        <link rel="stylesheet" href="/assets/vendor/prism/prism-nord.css" />
    {/if}
    <link
        rel="alternate"
        type="application/rss+xml"
        title="Spyder's Blog"
        href="{siteUrl}/blog/feed.xml"
    />
</svelte:head>
