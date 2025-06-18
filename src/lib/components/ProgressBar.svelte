<script>
  export let progress = 0;
  export let mt = 4;

  let textElement;
  let progressContainer;
  let marginLeft = 0;

  $: normalizedProgress = Math.min(progress, 100);

  function calculateMargin() {
    if (!textElement || !progressContainer) return 0;

    const containerWidth = progressContainer.offsetWidth;
    const textWidth = textElement.offsetWidth;

    if (containerWidth === 0 || textWidth === 0) return 0;

    // Calculate target position (center text on progress end)
    const targetPixels = (normalizedProgress / 100) * containerWidth - textWidth / 2;

    // Keep within bounds
    const minPixels = 0;
    const maxPixels = containerWidth - textWidth;
    const constrainedPixels = Math.min(Math.max(targetPixels, minPixels), maxPixels);

    // Convert to percentage
    return (constrainedPixels / containerWidth) * 100;
  }

  $: {
    normalizedProgress;
    if (textElement && progressContainer) {
      marginLeft = calculateMargin();
    }
  }
</script>

<div class="progress-bar-container mt-{mt}" bind:this={progressContainer}>
  <div class="progress-bar">
    <div class="progress" style="width: {normalizedProgress}%" />
  </div>
  <div bind:this={textElement} class="progress-bar-text" style="margin-left: {marginLeft}%">
    {normalizedProgress}%
  </div>
</div>

<style lang="postcss">
  .progress-bar-container {
    @apply flex flex-col gap-[2px];
  }

  .progress-bar {
    @apply h-2 w-full overflow-hidden rounded-full bg-mine-shaft-100 dark:bg-mine-shaft-800;
  }

  .progress {
    @apply h-full bg-red-berry-800 transition-all duration-500 dark:bg-red-berry-900;
  }

  .progress-bar-text {
    @apply text-xs text-mine-shaft-600 dark:text-mine-shaft-400 transition-all duration-300 inline-block w-fit;
  }
</style>
