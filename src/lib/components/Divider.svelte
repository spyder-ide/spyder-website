<script>
  export let classes = "";
  export let stroke = false;
</script>

<div class="full overflow-hidden block h-14" class:mt-14={stroke}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
    class={classes}
  >
    {#if stroke}
      <path
        d="m0 0 598.97 114.72L1200 0" stroke-width="2"
        class="dark:stroke-mine-shaft-700 stroke-mine-shaft-200 fill-none"
      ></path>
    {:else}
      <path
        d="M1200 0L0 0 598.97 114.72 1200 0z"
        class="fill-spring-wood-50 dark:fill-mine-shaft-950"
      ></path>
    {/if}
  </svg>
</div>

<style lang="postcss">
  svg {
    @apply block h-14;
    width: calc(100% + 1.3px);
  }
</style>
