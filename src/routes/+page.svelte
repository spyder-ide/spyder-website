<script>
  import { json } from "svelte-i18n";
  import { frontpage } from "$lib/config";
  import { mergeContentBlocks } from "$lib/utils/content";

  import Hero from "$lib/blocks/Hero.svelte";
  import ContentBlock from "$lib/blocks/ContentBlock.svelte";

  let blocks = [];
  
  $: if ($json) {
    try {
      const translatedBlocks = $json("frontpage") || [];
      blocks = mergeContentBlocks(frontpage, translatedBlocks);
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
