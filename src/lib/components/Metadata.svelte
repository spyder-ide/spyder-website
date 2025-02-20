<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { browser } from "$app/environment";
    import { base } from "$app/paths";
    import { page } from "$app/stores";
    import { metadata } from "$lib/store/metadata";
    import { siteUrl, config } from "$lib/config";
    import { isArticleMetadata } from "$lib/metadata/validation";
    import type { ArticleMetadata } from "$lib/metadata/types";

    let site: string;
    let socials: typeof config.site.socials;
    let localeCode: string;
    let currentMetadata = $metadata;
    let isArticle = isArticleMetadata(currentMetadata);
    let articleMetadata = isArticle ? (currentMetadata as ArticleMetadata) : null;
    let prism = false;
    const untrailedUrl = currentMetadata.url?.replace(/\/+$/, '') || $page.url.href;

    $: {
      socials = config.site.socials;
      site = `@${socials.twitter.split("/").pop()}`;
      localeCode = $locale.replace('-', '_');

      // Update currentMetadata when store changes
      if (browser) {
        currentMetadata = $metadata;
        isArticle = isArticleMetadata(currentMetadata);
        articleMetadata = isArticle ? (currentMetadata as ArticleMetadata) : null;
        prism = isArticle ? (currentMetadata as ArticleMetadata).prism || false : false;
      }
    }
</script>

<svelte:head>
  <title>{currentMetadata.title}</title>
  <meta name="description" content={currentMetadata.description} />
  <meta name="keywords" content={Array.isArray(currentMetadata.keywords) ? currentMetadata.keywords.join(', ') : currentMetadata.keywords} />
  <meta name="author" content={currentMetadata.author} />
  <link rel="canonical" href={untrailedUrl} />
  <link
    rel="alternate"
    type="application/rss+xml"
    title="Spyder's Blog"
    href="{siteUrl}/blog/feed.xml"
  />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={isArticle ? 'article' : 'website'} />
  <meta property="og:url" content={untrailedUrl} />
  <meta property="og:title" content={currentMetadata.title} />
  <meta property="og:description" content={currentMetadata.description} />
  <meta property="og:image" content={currentMetadata.image} />
  {#if currentMetadata.image?.startsWith("https")}
    <meta property="og:image:secure_url" content={currentMetadata.image} />
  {/if}
  <meta property="og:locale" content={localeCode} />
  <meta property="og:site_name" content={currentMetadata.site || "Spyder IDE"} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={site} />
  <meta name="twitter:creator" content={site} />
  <meta name="twitter:title" content={currentMetadata.title} />
  <meta name="twitter:description" content={currentMetadata.description} />
  <meta name="twitter:image" content={currentMetadata.image} />
  <meta name="twitter:image:alt" content={currentMetadata.title} />

  <!-- Article Specific Metadata -->
  {#if articleMetadata}
    <meta property="article:published_time" content={articleMetadata.pub_date} />
    {#if articleMetadata.modified_date}
      <meta property="article:modified_time" content={articleMetadata.modified_date} />
    {/if}
    {#if articleMetadata.tags}
      {#each (Array.isArray(articleMetadata.tags) ? articleMetadata.tags : [articleMetadata.tags]) as tag}
        <meta property="article:tag" content={tag} />
      {/each}
    {/if}
    {#if articleMetadata.category}
      <meta property="article:section" content={articleMetadata.category} />
    {/if}
  {/if}

  {#if prism}
    <!-- Nord stylesheet for code blocks with prism -->
    <link rel="stylesheet" href="{base}/assets/vendor/prism/prism-nord.css" />
  {/if}
</svelte:head>
