<script>
    import { _, locale } from "svelte-i18n";

    import { base } from "$app/paths";

    import { metadata } from "$lib/store";
    import { siteUrl, config } from "$lib/config";

    let site, socials, localeCode;
    const untrailedUrl = $metadata.url?.replace(/\/+$/, '') || siteUrl;

    $: {
      socials = config.site.socials;
      site = socials?.twitter ? `@${socials.twitter.split("/").pop()}` : "";
      localeCode = $locale?.replace('-', '_') || 'en_US';
    }

    export let prism = false;
</script>

<svelte:head>
  <title>{$metadata.title || config.site.title}</title>
  <meta name="description" content={$metadata.description || config.site.description} />
  <meta name="keywords" content={$metadata.keywords || config.site.keywords?.join(", ")} />
  <meta name="author" content={$metadata.author || config.site.author} />
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
  <meta property="og:title" content={$metadata.title || config.site.title} />
  <meta property="og:description" content={$metadata.description || config.site.description} />
  <meta property="og:image" content={$metadata.image || `${siteUrl}/assets/og/default.png`} />
  {#if $metadata.image?.startsWith("https")}
    <meta property="og:image:secure_url" content={$metadata.image} />
  {/if}
  <meta property="og:locale" content={localeCode} />
  <meta property="og:site_name" content="Spyder IDE" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={site} />
  <meta name="twitter:creator" content={site} />
  <meta name="twitter:title" content={$metadata.title || config.site.title} />
  <meta name="twitter:description" content={$metadata.description || config.site.description} />
  <meta name="twitter:image" content={$metadata.image || `${siteUrl}/assets/og/default.png`} />
  <meta name="twitter:image:alt" content={$metadata.title || config.site.title} />

  {#if prism}
    <!-- Nord stylesheet for code blocks with prism -->
    <link rel="stylesheet" href="{base}/assets/vendor/prism/prism-nord.css" />
  {/if}
</svelte:head>
