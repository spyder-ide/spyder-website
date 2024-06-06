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
  <ContentBlock
    id={block.id}
    border={block.border}
    video={block.video}
    videoId={block.videoId}
    videoSources={block.videoSources}
    videoPoster={block.videoPoster}
    tabs={block.tabs}
    button={block.button}
    buttonText={block.buttonText}
    buttonIcon={block.buttonIcon}
    buttonHref={block.buttonHref}
    buttonTarget={block.buttonTarget}
    buttonHighlight={block.buttonHighlight}
  >
    <svelte:component this={block.content} />
  </ContentBlock>
{/each}
