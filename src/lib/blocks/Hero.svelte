<script>
  import Vanta from "$lib/components/Vanta.svelte";
  import Button from "$lib/components/Button.svelte";
  import ImageCompare from "$lib/components/ImageCompare.svelte";

  import { heroContent, heroImages } from "$lib/config";

  export let id = "";
  export let classes = "";

  // Hero section buttons
  export let buttons = [];
</script>

<section {id} class="mt-20 {classes}">
  <Vanta />
  <div
    class="relative
    flex
    flex-col
    items-center
    gap-8
    px-8
    max-w-4xl
    mx-auto
    hero-content-container"
  >
    <h1
      class="tracking-tight
      text-5xl
      md:text-7xl
      font-extralight
      text-mine-shaft-400
      text-center"
    >
      {heroContent.title}
    </h1>
    <p class="font-light md:text-lg lg:text-xl text-center">
      {heroContent.description}
    </p>
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

  <div class="container aspect-video hero-image py-5">
    <ImageCompare before={heroImages.dark} after={heroImages.light} />
  </div>
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
