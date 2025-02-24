<script lang="ts">
    import { siteUrl } from "$lib/config";

    export let title: string = 'Spyder';
    export let description: string = '';
    export let keywords: string = '';
    export let author: string = '';
    export let url: string = '';
    export let image: string = '';
    export let prism: boolean = false;

    const site = `@spyder-ide`;
    $: untrailedUrl = url?.replace(/\/+$/, '') || '';
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content={author} />
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={untrailedUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:secure_url" content={image} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Spyder IDE" />
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={site} />
    <meta name="twitter:creator" content={site} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:image:alt" content={title} />
    {#if prism}
      <!-- Nord stylesheet for code blocks with prism -->
      <link rel="stylesheet" href="/assets/vendor/prism/prism-nord.css" />
    {/if}
    <link rel="canonical" href={untrailedUrl} />
    <link
      rel="alternate"
      type="application/rss+xml"
      title="Spyder's Blog"
      href="{siteUrl}/blog/feed.xml"
    />
</svelte:head>
