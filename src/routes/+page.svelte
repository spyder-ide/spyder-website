<script>
  import { page } from "$app/stores";
  import { config, frontpage, ogImage } from "$lib/config";
  import { metadata } from "$lib/store";
  import { mergeContentBlocks } from "$lib/utils/content";
  import { onMount } from "svelte";
  import { _, json } from "svelte-i18n";
  import { writable } from "svelte/store";

  import ContentBlock from "$lib/blocks/ContentBlock.svelte";
  import Hero from "$lib/blocks/Hero.svelte";
  import Metadata from "$lib/components/Metadata.svelte";

  let blocks = [];
  
  // Use a helper to trigger reactivity
  const forceUpdate = writable(0);
  
  // Listen for language changes
  onMount(() => {
    const handleLanguageChange = () => {
      // Bump counter to force reactivity
      $forceUpdate += 1;
    };
    
    window.addEventListener("language-changed", handleLanguageChange);
    
    return () => {
      window.removeEventListener("language-changed", handleLanguageChange);
    };
  });
  
  // Get translated blocks with reactive binding to locale and forceUpdate
  $: translatedBlocks = $json("frontpage") || [];
  $: blocks = mergeContentBlocks(frontpage, translatedBlocks);
  
  // This exists solely to trigger reactivity when forceUpdate changes
  $: if ($forceUpdate !== undefined) {
    // The reference to this reactive statement will trigger when 
    // forceUpdate changes, even if we don't do anything with it
    console.log("forceUpdate:", $forceUpdate);
  }

  $: title = $_("config.site.title");
  $: subtitle = $_("config.site.subtitle");
  $: description = $_("config.site.description");
  $: keywords = config.site?.keywords ?? [];

  $: metadata.setMetadata({
    title: `${title} | ${subtitle}`,
    description: description,
    keywords: keywords.join(", "),
    url: $page.url.href,
    image: ogImage,
  });
</script>

<Metadata />

<Hero id="hero-section" divider={true} />

{#if blocks?.length}
  {#each blocks as block (block.id)}
    <ContentBlock {...block} />
  {/each}
{/if}
