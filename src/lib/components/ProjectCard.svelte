<script>
  import { browser } from "$app/environment";
  import Button from "$lib/components/Button.svelte";
  import DynamicBg from "$lib/components/DynamicBg.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import ProgressBar from "$lib/components/ProgressBar.svelte";
  import { colourScheme } from "$lib/store";
  import { afterUpdate, onMount } from "svelte";
  import { locale } from "svelte-i18n";

  export let project;
  export let href;

  let currencyOptions = { style: "currency", currency: "USD", maximumFractionDigits: 0 };
  let cardImageContainer;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let isMobile = false;
  let redrawKey = 0; // To force component redraw

  /**
   * Color Harmony System
   *
   * This approach creates visually appealing color combinations using
   * established color harmony principles from color theory:
   *
   * - Complementary: Colors opposite on the color wheel (high contrast)
   * - Analogous: Colors adjacent on the color wheel (harmonious)
   * - Triadic: Three colors evenly spaced on the color wheel (balanced)
   * - Split-Complementary: Base color + two colors adjacent to its complement (dynamic but harmonious)
   *
   * For each harmony type, we also adjust the line count, stroke weight, and visual effect
   * to create visually distinct patterns that complement the colors.
   */

  // Helper function to convert HSL to RGB array
  function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color);
    };
    return [f(0), f(8), f(4)];
  }

  // Generate a color palette based on color harmony
  export function createHarmoniousPalette() {
    // Start with a random hue
    const baseHue = Math.floor(Math.random() * 360);

    // Create color harmonies (options: complementary, analogous, triadic, etc.)
    const harmonies = {
      complementary: [(baseHue + 180) % 360],
      analogous: [(baseHue + 30) % 360, (baseHue - 30 + 360) % 360],
      triadic: [(baseHue + 120) % 360, (baseHue + 240) % 360],
      split: [(baseHue + 150) % 360, (baseHue + 210) % 360],
    };

    // Pick a random harmony type
    const harmonyTypes = Object.keys(harmonies);
    const selectedHarmony = harmonyTypes[Math.floor(Math.random() * harmonyTypes.length)];
    const harmonyHues = [baseHue, ...harmonies[selectedHarmony]];

    // Generate color objects with varied saturations and lightnesses
    const baseColor = {
      hue: baseHue,
      saturation: 70 + Math.floor(Math.random() * 30),
      lightness: 45 + Math.floor(Math.random() * 15),
    };

    // For light mode: lighter background, darker accent
    const lightBg = hslToRgb(baseColor.hue, baseColor.saturation * 0.3, 90);
    const lightFgHue = harmonyHues[1] || harmonyHues[0];
    const lightFg = hslToRgb(lightFgHue, baseColor.saturation, 35);

    // For dark mode: deeper background, brighter accent
    const darkBg = hslToRgb(baseColor.hue, baseColor.saturation * 0.8, 15);
    const darkFgHue = harmonyHues[1] || harmonyHues[0];
    const darkFg = hslToRgb(darkFgHue, baseColor.saturation, 65);

    // Create a uniqueness factor for this palette - adjust line count and stroke weight
    // based on the harmony type to get varied effects
    let lineCount = 5;
    let strokeWeight = 1;
    let effectType = Math.random() > 0.5 ? "bezier" : "lines";

    switch (selectedHarmony) {
      case "complementary":
        lineCount = 7 + Math.floor(Math.random() * 5); // 7-11 lines
        strokeWeight = 1.5;
        effectType = "bezier"; // Complementary colors work well with bezier curves
        break;
      case "analogous":
        lineCount = 10 + Math.floor(Math.random() * 5); // 10-14 lines
        strokeWeight = 1;
        effectType = "lines"; // Analogous colors work well with wavy lines
        break;
      case "triadic":
        lineCount = 4 + Math.floor(Math.random() * 3); // 4-6 lines
        strokeWeight = 2;
        effectType = "bezier"; // Triadic colors look striking with bold bezier curves
        break;
      case "split":
        lineCount = 6 + Math.floor(Math.random() * 4); // 6-9 lines
        strokeWeight = 1.2;
        effectType = Math.random() > 0.3 ? "bezier" : "lines"; // Mix of both effects
        break;
    }

    // Return in the format expected by the component
    return {
      bgColors: {
        light: lightBg,
        dark: darkBg,
      },
      fgColors: {
        light: lightFg,
        dark: darkFg,
      },
      effectParams: {
        linesCount: lineCount,
        stroke: strokeWeight,
        // Randomize stroke alpha for additional variability
        strokeAlpha: 80,
        effectType: effectType,
      },
      type: selectedHarmony, // for debugging/info
    };
  }

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
                effectType={localColorScheme.effectParams.effectType}
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
    @apply pointer-events-none absolute bottom-0 left-0 z-10 w-full bg-white/70 p-6 text-4xl font-extralight text-red-berry-900 backdrop-blur-sm md:w-auto md:rounded-tr-2xl;
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
