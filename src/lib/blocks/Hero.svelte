<script>
  import { onMount } from "svelte";
  import { _, isLoading, json } from "svelte-i18n";

  import { config } from "$lib/config";
  import { osStore } from "$lib/store";

  import Button from "$lib/components/Button.svelte";
  import Divider from "$lib/components/Divider.svelte";
  import ImageCompare from "$lib/components/ImageCompare.svelte";
  import Vanta from "$lib/components/Vanta.svelte";

  export let id = "";
  export let classes = "";
  export let divider = false;

  // Hero section buttons
  export let buttons = [];

  let heroContent, heroImages, githubButton, githubButtonTranslation, translatedGithubButton, unsubscribeOs;
  let isOsLoading = true;

  $: {
    heroContent = $json("config.site.heroContent") || "";
    heroImages = config.site.heroImages || {};
    githubButton = config.site.githubButton || {};
    githubButtonTranslation = $json("config.site.githubButton") || {};
    translatedGithubButton = { ...githubButton, ...githubButtonTranslation };

    // Subscribe to osStore
    unsubscribeOs = osStore.subscribe((data) => {
      isOsLoading = data.loading;
      if (!data.loading && !$isLoading) {
        const translatedOsButtons = data.osButtons.map((button) => ({
          ...button,
          text: `${$_("download.button.message")} ${button.text}`,
        }));
        buttons = [...translatedOsButtons, translatedGithubButton];
      }
    });
  }

  onMount(() => {
    return () => {
      if (unsubscribeOs) unsubscribeOs();
    };
  });
</script>

<section {id} class="mt-20 {classes}">
  <Vanta />
  <div
    class="hero-content-container
    relative
    mx-auto
    flex
    flex-col
    items-center
    gap-8
    px-8
    xl:max-w-6xl"
  >
    <h1
      class="text-center
      text-4xl
      font-extralight
      tracking-tight
      text-gray-500
      dark:text-mine-shaft-300
      md:text-5xl
      xl:text-7xl"
    >
      {heroContent.title}
    </h1>
    <p class="text-center font-light md:text-lg xl:text-xl">
      {heroContent.description}
    </p>
    {#if buttons.length > 0 && !isOsLoading && !$isLoading}
      <div class="grid grid-flow-row items-center gap-4 md:grid-flow-col">
        {#each buttons as button}
          <Button highlight={button.highlight} icon={button.icon} text={button.text} href={button.href} />
        {/each}
      </div>
    {:else if heroContent.description}
      <div class="grid grid-flow-row items-center gap-4 md:grid-flow-col h-12 opacity-0">
        <!-- Placeholder to reserve space -->
        <div class="py-4 px-5 rounded min-h-12 w-32"></div>
      </div>
    {/if}
  </div>

  <ImageCompare before={heroImages.dark} after={heroImages.light} />

  {#if divider}
    <Divider stroke={true} />
  {/if}
</section>
