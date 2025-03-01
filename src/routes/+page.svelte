<script>
  import { frontpage } from "$lib/config";
  import { mergeContentBlocks } from "$lib/utils/content";
  import { _, json } from "svelte-i18n";

  import ContentBlock from "$lib/blocks/ContentBlock.svelte";
  import Hero from "$lib/blocks/Hero.svelte";
  import Metadata from "$lib/components/Metadata.svelte";

  export let data;

  let blocks = [];
  let metadata = data.metadata || {};
  
  $: {
      const translatedBlocks = $json("frontpage") || [];
      const subtitle = $_("config.site.subtitle") || data.metadata.subtitle;
      blocks = mergeContentBlocks(frontpage, translatedBlocks);
      metadata = { title: `${data.metadata.title} | ${subtitle}` };
  }
</script>

<Metadata {...metadata} />

<Hero id="hero-section" divider={true} />

{#if blocks?.length}
  {#each blocks as block (block.id)}
    <ContentBlock {...block} />
  {/each}
{/if}
