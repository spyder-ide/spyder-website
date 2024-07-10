<script>
  // Components
  import Hero from "$lib/blocks/Hero.svelte";
  import ContentBlock from "$lib/blocks/ContentBlock.svelte";

  export let data;
  let blocks = data.props.blocks;
  let buttons = data.props.buttons;
</script>

<Hero id="hero-section" {buttons} />

{#each blocks as block (block.id)}
  <ContentBlock {...block}>
    <svelte:component this={block.content} />
  </ContentBlock>
{/each}
