<script>
  import { _, json } from "svelte-i18n";

  import { metadata } from "$lib/store";
  import { siteUrl, ogImage } from "$lib/config";

  import Hero from "$lib/blocks/Hero.svelte";
  import ContentBlock from "$lib/blocks/ContentBlock.svelte";
  import Metadata from "$lib/components/Metadata.svelte";

  let blocks, title, subtitle, description, keywords, author;

  $: {
    blocks = $json("frontpage.props.blocks");
    title = $_("config.site.title");
    subtitle = $_("config.site.subtitle");
    author = $_("config.site.author");
    description = $_("config.site.description");
    keywords = $json("config.site.keywords");

    metadata.setMetadata({
      title: `${title} | ${subtitle}`,
      description,
      keywords: keywords.join(", "),
      author,
      url: siteUrl,
      image: ogImage,
    });
  }
</script>

<Metadata />

<Hero id="hero-section" divider={true} />

{#each blocks as block (block.id)}
  <ContentBlock {...block} />
{/each}
