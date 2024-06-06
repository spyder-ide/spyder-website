<script>
  export let tabs = [];

  let current = tabs[0];
</script>

<div class="flex gap-8 justify-end border-b border-mine-shaft-300">
  {#each tabs as tab}
    <button
      class="pb-3 border-b-4 border-red-berry-900"
      class:selected={current === tab}
      on:click={() => (current = tab)}
    >
      {tab.title}
    </button>
  {/each}
</div>

<div>
  <svelte:component this={current.content} />
</div>

<style>
  .selected {
    border-color: theme("colors.red-berry.800");
    color: theme("colors.neutral.500")
  }
</style>
