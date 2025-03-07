<script>
  import { _, json, isLoading } from "svelte-i18n";
  import { onMount } from "svelte";

  import { osStore } from "$lib/store";
  import { config } from "$lib/config";

  import Vanta from "$lib/components/Vanta.svelte";
  import Button from "$lib/components/Button.svelte";
  import ImageCompare from "$lib/components/ImageCompare.svelte";
  import Divider from "$lib/components/Divider.svelte";

  export let id = "";
  export let classes = "";
  export let divider = false;

  // Hero section buttons
  export let buttons = [];

  let heroContent, heroImages, githubButton, githubButtonTranslation, translatedGithubButton, unsubscribeOs;

  $: {
    heroContent = $json("config.site.heroContent") || "";
    heroImages = config.site.heroImages || {};
    githubButton = config.site.githubButton || {};
    githubButtonTranslation = $json("config.site.githubButton") || {};
    translatedGithubButton = { ...githubButton, ...githubButtonTranslation };

    // Subscribe to osStore
    unsubscribeOs = osStore.subscribe((data) => {
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
    {#if buttons.length > 0}
      <div class="grid grid-flow-row items-center gap-4 md:grid-flow-col">
        {#each buttons as button}
          <Button highlight={button.highlight} icon={button.icon} text={button.text} href={button.href} />
        {/each}
      </div>
    {/if}
  </div>

  <ImageCompare before={heroImages.dark} after={heroImages.light} />

  {#if divider}
    <Divider stroke={true} />
  {/if}
</section>
