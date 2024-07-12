<script>
  import { fade } from "svelte/transition";
  import Loader from "./Loader.svelte";
  export let tabs = [];

  let current = tabs[0];
</script>

<div class="flex gap-8 justify-end border-b border-mine-shaft-300 dark:border-mine-shaft-600 text-sm h-8 -mt-8">
  {#each tabs as tab}
    <button
      class="pb-2 border-b-2 border-red-berry-900 dark:border-red-berry-800 text-neutral-500"
      class:selected={current === tab}
      on:click={() => (current = tab)}
    >
      {tab.title}
    </button>
  {/each}
</div>

{#key current.content}
  {#if !current.content}
    <Loader />
  {/if}
  <div class="mt-2" in:fade="{{ duration: 200 }}">
    <svelte:component this={current.content} />
  </div>
{/key}

<style>
  .selected {
    border-color: theme("colors.red-berry.500");
    color: theme("colors.neutral.900");
    @apply dark:text-quill-gray-200;
  }
</style>
