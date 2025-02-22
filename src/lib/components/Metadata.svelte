<script>
    import { siteUrl } from "$lib/config";
    import { metadata } from "$lib/store";

    const site = `@spyder-ide`;
    $: untrailedUrl = $metadata.url?.replace(/\/+$/, '') || '';

    export let prism = false;
</script>

<svelte:head>
    <title>{$metadata.title || 'Spyder'}</title>
    <meta name="description" content={$metadata.description} />
    <meta name="keywords" content={$metadata.keywords} />
    <meta name="author" content={$metadata.author} />
    <link rel="canonical" href={untrailedUrl} />
    <link
      rel="alternate"
      type="application/rss+xml"
      title="Spyder's Blog"
      href="{siteUrl}/blog/feed.xml"
    />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={untrailedUrl} />
    <meta property="og:title" content={$metadata.title || 'Spyder'} />
    <meta property="og:description" content={$metadata.description} />
    <meta property="og:image" content={$metadata.image} />
    <meta property="og:image:secure_url" content={$metadata.image} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Spyder IDE" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={site} />
    <meta name="twitter:creator" content={site} />
    <meta name="twitter:title" content={$metadata.title || 'Spyder'} />
    <meta name="twitter:description" content={$metadata.description} />
    <meta name="twitter:image" content={$metadata.image} />
    <meta name="twitter:image:alt" content={$metadata.title} />

    {#if prism}
      <!-- Nord stylesheet for code blocks with prism -->
      <link rel="stylesheet" href="/assets/vendor/prism/prism-nord.css" />
    {/if}
</svelte:head>
