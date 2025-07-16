<script lang="ts">
    import { config, siteUrl } from "$lib/config";
    import { metadata } from "$lib/store";

    // Default values that can be overridden by metadata store
    export let title: string = `${config.site?.title} | ${config.site?.subtitle}`;
    export let description: string = config.site?.description ?? 'The Python IDE that scientists and data analysts deserve';
    export let keywords: string = config.site?.keywords?.join(', ') ?? '';
    export let author: string = config.site?.author ?? '';
    export let url: string = 'https://spyder-ide.org';
    export let image: string = 'https://spyder-ide.org/assets/media/website_screenshot.png';
    export let prism: boolean = false;

    // Use store values if available
    $: storeTitle = $metadata.title || title;
    $: storeDescription = $metadata.description || description;
    $: storeKeywords = $metadata.keywords || keywords;
    $: storeUrl = $metadata.url || url;
    $: storeImage = $metadata.image || image;

    const site = `@Spyder_IDE`;
    $: untrailedUrl = storeUrl?.replace(/\/+$/, '') || '';
    $: absoluteUrl = untrailedUrl.startsWith('http') ? untrailedUrl : `${siteUrl}${untrailedUrl}`;
    $: absoluteImage = storeImage.startsWith('http') ? storeImage : `${siteUrl}${storeImage}`;
</script>

<svelte:head>
    <!-- Essential Meta Tags -->
    <title>{storeTitle}</title>
    <meta name="description" content={storeDescription} />
    <meta name="keywords" content={storeKeywords} />
    <meta name="author" content={author} />
    <link rel="canonical" href={absoluteUrl} />
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Spyder IDE" />
    <meta property="og:url" content={absoluteUrl} />
    <meta property="og:title" content={storeTitle} />
    <meta property="og:description" content={storeDescription} />
    <meta property="og:image" content={absoluteImage} />
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_US" />
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={site} />
    <meta name="twitter:title" content={storeTitle} />
    <meta name="twitter:description" content={storeDescription} />
    <meta name="twitter:image" content={absoluteImage} />
    <meta name="twitter:image:alt" content={storeTitle} />
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
