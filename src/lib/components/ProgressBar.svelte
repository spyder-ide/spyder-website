<script>
  export let progress = 0;

  let percentage = 0;
  let offset = 0;

  $: normalizedProgress = Math.min(progress, 100);
  $: offset = percentage.offsetWidth / 2;
</script>

<div class="progress-bar-container relative mt-4">
  <div class="progress-bar">
    <div class="progress" style="width: {normalizedProgress}%" />
  </div>
  <div
    bind:this={percentage}
    class="progress-bar-text"
    style="left: min(max(calc({normalizedProgress}% - {offset}px), 0px), calc(100% - {percentage?.offsetWidth || 0}px))"
  >
    {normalizedProgress}%
  </div>
</div>

<style lang="postcss">
  /* dark:bg-mine-shaft-950 dark:text-spring-wood-50 */
  .progress-bar {
    @apply h-4 w-full overflow-hidden rounded-full bg-mine-shaft-100 dark:bg-mine-shaft-800;
  }

  .progress-bar-text {
    @apply absolute left-0 top-5 text-center text-sm;
  }

  .progress {
    @apply h-full bg-red-berry-800 transition-all duration-500 dark:bg-red-berry-900;
  }
</style>
