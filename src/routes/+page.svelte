<script>
  import Hero from "$lib/blocks/Hero.svelte";
  import ContentBlock from "$lib/blocks/ContentBlock.svelte";
  import { osStore } from '$lib/store';

  export let data;
  let blocks = data.props.blocks;
</script>

<Hero id="hero-section" {osStore} />

{#each blocks as block (block.id)}
  <ContentBlock {...block} {osStore}>
    <svelte:component this={block.content} />
  </ContentBlock>
{/each}
