<script>
    import { _, locale } from "svelte-i18n";
    import { browser } from "$app/environment";

    import { base } from "$app/paths";
    import { page } from "$app/stores";

    import { metadata } from "$lib/store";
    import { siteUrl, config } from "$lib/config";

    let site, socials, localeCode;
    let currentMetadata = $metadata;
    const untrailedUrl = currentMetadata.url?.replace(/\/+$/, '') || $page.url.href;

    $: {
      socials = config.site.socials;
      site = `@${socials.twitter.split("/").pop()}`;
      localeCode = $locale.replace('-', '_');

      // Update currentMetadata when store changes
      if (browser) {
        currentMetadata = $metadata;
      }
    }

    export let prism = false;
</script>

<svelte:head>
  <title>{currentMetadata.title}</title>
  <meta name="description" content={currentMetadata.description} />
  <meta name="keywords" content={currentMetadata.keywords} />
  <meta name="author" content={currentMetadata.author} />
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
  <meta property="og:title" content={currentMetadata.title} />
  <meta property="og:description" content={currentMetadata.description} />
  <meta property="og:image" content={currentMetadata.image} />
  {#if currentMetadata.image?.startsWith("https")}
    <meta property="og:image:secure_url" content={currentMetadata.image} />
  {/if}
  <meta property="og:locale" content={localeCode} />
  <meta property="og:site_name" content="Spyder IDE" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={site} />
  <meta name="twitter:creator" content={site} />
  <meta name="twitter:title" content={currentMetadata.title} />
  <meta name="twitter:description" content={currentMetadata.description} />
  <meta name="twitter:image" content={currentMetadata.image} />
  <meta name="twitter:image:alt" content={currentMetadata.title} />

  {#if prism}
    <!-- Nord stylesheet for code blocks with prism -->
    <link rel="stylesheet" href="{base}/assets/vendor/prism/prism-nord.css" />
  {/if}
</svelte:head>
