<script>
  import { osStore } from "$lib/store";
  import { heroContent, heroImages, githubButton } from "$lib/config";

  import Vanta from "$lib/components/Vanta.svelte";
  import Button from "$lib/components/Button.svelte";
  import ImageCompare from "$lib/components/ImageCompare.svelte";

  export let id = "";
  export let classes = "";

  // Hero section buttons
  export let buttons = [];

  // Subscribe to osStore
  osStore.subscribe((data) => {
    if (!data.loading) {
      buttons = [...data.osButtons, githubButton];
    }
  });
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
    xl:max-w-6xl
    mx-auto
    hero-content-container"
  >
    <h1
      class="tracking-tight
      text-4xl
      md:text-5xl
      xl:text-7xl
      font-extralight
      text-gray-500
      dark:text-mine-shaft-300
      text-center"
    >
      {heroContent.title}
    </h1>
    <p class="font-light md:text-lg xl:text-xl text-center">
      {heroContent.description}
    </p>
    {#if buttons.length > 0}
      <div class="grid grid-flow-row md:grid-flow-col gap-4 items-center">
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
  .hero-image {
    margin-top: 4rem;
  }
</style>
