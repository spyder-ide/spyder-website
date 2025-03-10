<script>
  import { browser } from "$app/environment";
  import Button from "$lib/components/Button.svelte";
  import DynamicBg from "$lib/components/DynamicBg.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import ProgressBar from "$lib/components/ProgressBar.svelte";
  import { createHarmoniousPalette } from "$lib/utils";
  import { afterUpdate, onMount } from "svelte";

  import { colourScheme } from "$lib/store";
  import { locale } from "svelte-i18n";
  // Import color scheme store

  export let project;
  export let href;

  let currencyOptions = { style: "currency", currency: "USD", maximumFractionDigits: 0 };
  let cardImageContainer;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let isMobile = false;
  let redrawKey = 0; // To force component redraw

  // Use the function to generate your color schemes
  const localColorScheme = createHarmoniousPalette();
  const bgColors = localColorScheme.bgColors;
  const fgColors = localColorScheme.fgColors;

  // Calculate dimensions based on container width and device size
  function calculateDimensions() {
    if (!cardImageContainer || !browser) return;

    // Get the container width
    const containerWidth = cardImageContainer.clientWidth;
    const newIsMobile = window.innerWidth < 768; // Matches the md: breakpoint in Tailwind

    // Only update if dimensions actually changed
    if (canvasWidth !== containerWidth || isMobile !== newIsMobile) {
      canvasWidth = containerWidth;
      isMobile = newIsMobile;

      // Set height based on aspect ratio
      if (isMobile) {
        // Square aspect ratio (1:1) for mobile
        canvasHeight = containerWidth;
      } else {
        // Video aspect ratio (16:9) for larger screens
        canvasHeight = containerWidth * (9 / 16);
      }

      // Increment redraw key to force DynamicBg to reinitialize
      redrawKey++;
    }
  }

  onMount(() => {
    if (browser) {
      calculateDimensions();
      window.addEventListener("resize", calculateDimensions);

      return () => {
        window.removeEventListener("resize", calculateDimensions);
      };
    }
  });

  afterUpdate(() => {
    if (browser) {
      calculateDimensions();
    }
  });

  $: progress = Math.min(project.donations.progress, 100);

  // Recalculate dimensions when the window resizes
  $: if (browser && typeof window !== "undefined") {
    window.innerWidth; // This creates a dependency on window.innerWidth
    setTimeout(calculateDimensions, 0); // Schedule recalculation
  }

  // Trigger redraw when color scheme changes
  $: if ($colourScheme) {
    redrawKey++; // Force redraw when color scheme changes
  }
</script>

<div class="group">
  <div class="card">
    <div class="card-image" bind:this={cardImageContainer}>
      {#await project.image}
        <Loader />
      {:then}
        {#if href && project.image}
          <a {href}>
            <img class="project-image" src={project.image} alt={project.title} />
          </a>
        {:else if project.image}
          <img class="project-image" src={project.image} alt={project.title} />
        {:else}
          <div class="dynamic-bg-container">
            {#key redrawKey}
              <DynamicBg
                width={canvasWidth}
                height={canvasHeight}
                backgroundColor={$colourScheme === "dark" ? bgColors.light : bgColors.dark}
                strokeColor={$colourScheme === "dark" ? fgColors.light : fgColors.dark}
                stroke={localColorScheme.effectParams.stroke}
                linesCount={localColorScheme.effectParams.linesCount}
                strokeAlpha={localColorScheme.effectParams.strokeAlpha}
              />
            {/key}
          </div>
        {/if}
      {/await}
      <h4 class="card-title">
        {project.title}
      </h4>
    </div>
    <div class="card-container">
      {#if project.donations}
        <div class="donations">
          {project.collected}:
          <span class="font-bold">{project.donations.total.toLocaleString($locale, currencyOptions)}</span>
          {#if project.donationGoal}
            {project.separator}
            <span class="font-bold">{project.donationGoal.toLocaleString($locale, currencyOptions)}</span>
            <ProgressBar {progress} />
          {/if}
        </div>
      {/if}
      {#if project.content}
        <div class="card-content">{project.content}</div>
      {/if}
      {#if project.button && href}
        <div class="button-container">
          <Button text={project.button.text} highlight={true} icon="donate" iconSize={24} textSize="lg" {href} />
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="postcss">
  .group {
    @apply w-full flex-shrink-0 py-4 md:w-1/2 md:px-4 xl:w-1/3;
  }
  .card {
    @apply grid h-full grid-cols-1 rounded-2xl border border-neutral-300 shadow-2xl dark:border-neutral-700 dark:shadow-neutral-900;
    grid-template-rows: auto 1fr;
  }

  .card-container {
    @apply grid grid-cols-1 gap-8 p-8;
    grid-template-rows: 1fr auto;
  }

  .card-title {
    @apply pointer-events-none absolute bottom-0 left-0 z-10 w-full bg-white/70 p-6 text-5xl font-extralight text-red-berry-900 backdrop-blur-sm md:w-auto md:rounded-tr-2xl;
  }

  .card-image {
    @apply relative overflow-hidden;
  }

  .project-image {
    @apply rounded-t-2xl aspect-square w-full md:aspect-video;
  }

  .dynamic-bg-container {
    @apply rounded-t-2xl aspect-square w-full md:aspect-video overflow-hidden;
  }

  .card-content {
    @apply font-light;
  }

  .donations {
    @apply text-lg font-light;
  }
</style>
