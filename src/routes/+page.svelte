<script>
  import { _, json } from 'svelte-i18n';
  import Hero from "$lib/blocks/Hero.svelte";
  import ContentBlock from "$lib/blocks/ContentBlock.svelte";
  import Metadata from "$lib/components/Metadata.svelte";

  let blocks = $json('frontpage.props.blocks');
</script>

<Metadata/>

<Hero id="hero-section" divider={true} />

{#each blocks as block (block.id)}
  <ContentBlock {...block}/>
{/each}
