<script>
  import Hero from "$lib/blocks/Hero.svelte";
  import ContentBlock from "$lib/blocks/ContentBlock.svelte";
  import Metadata from "$lib/components/Metadata.svelte";

  export let data;
  let blocks = data.props.blocks;
</script>

<Metadata/>

<Hero id="hero-section" divider={true} />

{#each blocks as block (block.id)}
  <ContentBlock {...block}/>
{/each}
