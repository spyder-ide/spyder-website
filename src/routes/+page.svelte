<script>
  import { frontpage } from "$lib/config";
  import { mergeContentBlocks } from "$lib/utils/content";
  import { onMount } from "svelte";
  import { _, json } from "svelte-i18n";
  import { writable } from "svelte/store";

  import ContentBlock from "$lib/blocks/ContentBlock.svelte";
  import Hero from "$lib/blocks/Hero.svelte";
  import Metadata from "$lib/components/Metadata.svelte";

  export let data;

  let blocks = [];
  let metadata = data.metadata || {};
  
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

  const subtitle = $_("config.site.subtitle") || data.metadata.subtitle;
  
  // Get translated blocks with reactive binding to locale and forceUpdate
  $: translatedBlocks = $json("frontpage") || [];
  $: blocks = mergeContentBlocks(frontpage, translatedBlocks);
  $: metadata = { title: `${data.metadata.title} | ${subtitle}` };
  
  // This exists solely to trigger reactivity when forceUpdate changes
  $: if ($forceUpdate !== undefined) {
    // The reference to this reactive statement will trigger when 
    // forceUpdate changes, even if we don't do anything with it
  }
</script>

<Metadata {...metadata} />

<Hero id="hero-section" divider={true} />

{#if blocks?.length}
  {#each blocks as block (block.id)}
    <ContentBlock {...block} />
  {/each}
{/if}
