<script>
  import { base } from "$app/paths";
  import { getOS } from "$lib/utils";

  import Vanta from "$lib/components/Vanta.svelte";
  import Button from "$lib/components/Button.svelte";
  import ImageCompare from "$lib/components/ImageCompare.svelte";

  import HeroContent from "$lib/content/hero.md";

  export let id = "";
  export let classes = "";

  // Hero section buttons
  export let buttons = [];
</script>

<section {id} class="mt-20 {classes}">
  <div
    class="relative flex flex-col items-center gap-8 px-8 max-w-4xl mx-auto hero-content-container"
  >
    <HeroContent />
    {#if buttons.length > 0}
       <div class="flex gap-4 items-center">
         {#each buttons as button}
           <Button
             highlight={button.highlight}
             icon={button.icon}
             text={button.text}
             href={button.href}
           />
         {/each}
       </div>
    {/if}
  </div>

  <div class="container aspect-video hero-image">
    <ImageCompare
      before="//place-hold.it/1280x1024/1D3557/FFFFFF?text=IMAGE A&fontsize=60"
      after="//place-hold.it/1280x1024/CCCCCC/FFFFFF?text=IMAGE B&fontsize=60"
    />
  </div>

  <Vanta />
</section>

<style>
  .hero-content-container {
    height: calc(100dvh - 5rem);
  }

  .hero-image {
    margin-block-start: -45dvh;

    @media screen and (min-width: 1024px) {
      margin-block-start: -40dvh;
    }
  }
</style>
