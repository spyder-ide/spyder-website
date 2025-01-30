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

  let heroContent,
    heroImages,
    githubButton,
    githubButtonTranslation,
    tranlatedGithubButton,
    unsubscribeOs;

  $: {
    heroContent = $json("config.site.heroContent") || "";
    heroImages = config.site.heroImages || {};
    githubButton = config.site.githubButton || {};
    githubButtonTranslation = $json("config.site.githubButton") || {};
    tranlatedGithubButton = { ...githubButton, ...githubButtonTranslation };
  }

  onMount(() => {
    // Subscribe to osStore
    unsubscribeOs = osStore.subscribe((data) => {
      if (!data.loading && !$isLoading) {
        const translatedOsButtons = data.osButtons.map((button) => ({
          ...button,
          text: `${$_("download.button.message")} ${button.text}`,
        }));
        buttons = [...translatedOsButtons, tranlatedGithubButton];
      }
    });

    return () => {
      if (unsubscribeOs) unsubscribeOs();
    };
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

  <div class="container aspect-video py-5 mt-16">
    <ImageCompare before={heroImages.dark} after={heroImages.light} />
  </div>

  {#if divider}
    <Divider stroke={true} />
  {/if}
</section>

