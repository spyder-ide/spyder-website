<script>
  import { _, json } from "svelte-i18n";
  import { config, frontpage } from "$lib/config";
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

<Hero id="hero-section" divider={true} />

{#if blocks?.length}
  {#each blocks as block (block.id)}
    <ContentBlock {...block} />
  {/each}
{/if}
