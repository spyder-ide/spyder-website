<script>
  import { fade } from "svelte/transition";

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
  {#if current.content}
    <div class="tab-content" in:fade="{{ duration: 200 }}">
      <svelte:component this={current.content} />
    </div>
  {:else}
    <div class="tab-content bg-red-berry-900"></div>
  {/if}
{/key}

<style>
  .selected {
    border-color: theme("colors.red-berry.500");
    color: theme("colors.neutral.900");
    @apply dark:text-quill-gray-200;
  }
  .tab-content {
    @apply w-full;
    min-height: 500px;
    margin-top: 1em;
  }
</style>
