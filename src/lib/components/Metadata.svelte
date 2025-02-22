<script>
    import { siteUrl } from "$lib/config";
    import { metadata } from "$lib/store";

    const site = `@spyder-ide`;
    $: untrailedUrl = $metadata.url?.replace(/\/+$/, '') || '';
    $: shouldShowMetadata = !$metadata.isLoading;

    export let prism = false;
</script>

<svelte:head>
  {#if shouldShowMetadata}
    <title>{$metadata.title}</title>
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={$metadata.image} />

    {#if prism}
      <!-- Nord stylesheet for code blocks with prism -->
      <link rel="stylesheet" href="/assets/vendor/prism/prism-nord.css" />
    {/if}
  {/if}
</svelte:head>
