<script>
  import Hero from "$lib/blocks/Hero.svelte";
  import ContentBlock from "$lib/blocks/ContentBlock.svelte";

  export let data;
  let blocks = data.props.blocks;
</script>

<Hero id="hero-section" />

{#each blocks as block (block.id)}
  <ContentBlock {...block} >
    {#if typeof block.content !== 'object'}
      <svelte:component this={block.content} />
    {/if}
  </ContentBlock>
{/each}
