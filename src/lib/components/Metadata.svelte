<script>
    import { page } from "$app/stores";
    import { base } from "$app/paths";
    import { socials } from "$lib/config";
    import { metadata } from "$lib/store";

    const site = `@${socials.twitter.split("/").pop()}`;

    export let prism = false;
</script>

<svelte:head>
  <title>{$metadata.title}</title>
  <meta name="description" content={$metadata.description} />
  <meta name="keywords" content={$metadata.keywords} />
  <meta name="author" content={$metadata.author} />
  <link rel="canonical" href={$metadata.url} />
  <link
    rel="alternate"
    type="application/rss+xml"
    title="Spyder's Blog"
    href="{$metadata.url}feed.xml"
  />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={$metadata.url} />
  <meta property="og:title" content={$metadata.title} />
  <meta property="og:description" content={$metadata.description} />
  <meta property="og:image" content={$metadata.image} />
  <meta property="og:image:secure_url" content={$metadata.image} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:site_name" content={site} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={$page.url.host} />
  <meta property="twitter:url" content={$metadata.url} />
  <meta name="twitter:site" content={$metadata.site} />
  <meta name="twitter:title" content={$metadata.title} />
  <meta name="twitter:description" content={$metadata.description} />
  <meta name="twitter:image" content={$metadata.image} />
  <meta name="twitter:image:alt" content={$metadata.title} />

  {#if prism}
    <!-- Nord stylesheet for code blocks with prism -->
    <link rel="stylesheet" href="{base}/assets/vendor/prism/prism-nord.css" />
  {/if}
</svelte:head>
