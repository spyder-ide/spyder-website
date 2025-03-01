<script>
  export let classes = "";
</script>

<div class="w-full h-full grid items-center justify-center m-auto min-h-20 min-w-20">
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle class="spinner fill-mine-shaft-950 dark:fill-spring-wood-50 {classes}" cx="12" cy="12" r="0" />
  </svg>
</div>

<style lang="postcss">
  .spinner {
    animation: spinnerMove 1.2s cubic-bezier(0.52, 0.6, 0.25, 0.99) infinite;
  }
  @keyframes spinnerMove {
    0% {
      r: 0;
      opacity: 1;
    }
    100% {
      r: 11px;
      opacity: 0;
    }
  }
</style>
