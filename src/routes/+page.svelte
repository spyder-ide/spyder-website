<script>
  import { _, json } from "svelte-i18n";
  import { metadata } from "$lib/store";
  import { siteUrl, ogImage, config } from "$lib/config";

  import Hero from "$lib/blocks/Hero.svelte";
  import ContentBlock from "$lib/blocks/ContentBlock.svelte";
  import Metadata from "$lib/components/Metadata.svelte";

  let blocks = [];
  let title = "";
  let subtitle = "";
  let description = "";
  let keywords = [];
  let author = "";

  $: if ($json && $_) {
    try {
      blocks = $json("frontpage.props.blocks") || [];
      title = $_("config.site.title") || "";
      subtitle = $_("config.site.subtitle") || "";
      author = $_("config.site.author") || "";
      description = $_("config.site.description") || "";
      keywords = config.site.keywords || [];

      metadata.setMetadata({
        title: title && subtitle ? `${title} | ${subtitle}` : title,
        description,
        keywords: Array.isArray(keywords) ? keywords.join(", ") : "",
        author,
        url: siteUrl,
        image: ogImage,
      });
    } catch (error) {
      console.error("Error loading translations:", error);
    }
  }
</script>

<Metadata />

<Hero id="hero-section" divider={true} />

{#if blocks && blocks.length > 0}
  {#each blocks as block (block.id)}
    <ContentBlock {...block} />
  {/each}
{/if}
