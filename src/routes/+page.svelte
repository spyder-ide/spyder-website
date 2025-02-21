<script>
  import { _, json } from "svelte-i18n";
  import { config, frontpage, siteUrl, ogImage } from "$lib/config";
  import { mergeContentBlocks } from "$lib/utils/content";

  import Hero from "$lib/blocks/Hero.svelte";
  import ContentBlock from "$lib/blocks/ContentBlock.svelte";

  let blocks = [];
  let title = "";
  let subtitle = "";
  let description = "";
  let keywords = [];
  let author = "";

  $: if ($json && $_) {
    try {
      // Merge config blocks with translated blocks
      const translatedBlocks = $json("frontpage") || [];
      blocks = mergeContentBlocks(frontpage, translatedBlocks);

      // Load page metadata
      title = $_("config.site.title") || "";
      subtitle = $_("config.site.subtitle") || "";
      author = $_("config.site.author") || "";
      description = $_("config.site.description") || "";
      keywords = config.site.keywords || [];
    } catch (error) {
      console.error("Error loading content:", error);
    }
  }
</script>

<svelte:head>
  <title>{$_('config.site.title') || 'Spyder'} | {$_('config.site.subtitle') || 'The Python IDE that scientists and data analysts deserve'}</title>
  <meta name="description" content={$_('config.site.description') || 'Get the ease of use of Jupyter along with many advanced features found in PyCharm and VSCode in a single programming environment'} />
  <meta name="keywords" content={'Python, IDE, Scientific Computing, Data Analysis, Spyder, Jupyter, PyCharm, VSCode'} />
  <meta name="author" content={$_('config.site.author') || 'Spyder Website Contributors'} />
  <link rel="canonical" href={siteUrl} />
  <meta property="og:title" content={$_('config.site.title') || 'Spyder'} />
  <meta property="og:description" content={$_('config.site.description') || 'Get the ease of use of Jupyter along with many advanced features found in PyCharm and VSCode in a single programming environment'} />
  <meta property="og:url" content={siteUrl} />
  <meta property="og:site_name" content={$_('config.site.title') || 'Spyder'} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={ogImage} />
  {#if ogImage.startsWith('https')}
    <meta property="og:image:secure_url" content={ogImage} />
  {/if}
  <meta property="og:image:alt" content={$_('config.site.title') || 'Spyder'} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@spyder_ide" />
  <meta name="twitter:creator" content="@spyder_ide" />
  <meta name="twitter:title" content={$_('config.site.title') || 'Spyder'} />
  <meta name="twitter:description" content={$_('config.site.description') || 'Get the ease of use of Jupyter along with many advanced features found in PyCharm and VSCode in a single programming environment'} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:image:alt" content={$_('config.site.description') || 'Get the ease of use of Jupyter along with many advanced features found in PyCharm and VSCode in a single programming environment'} />
</svelte:head>

<Hero id="hero-section" divider={true} />

{#if blocks?.length}
  {#each blocks as block (block.id)}
    <ContentBlock {...block} />
  {/each}
{/if}
