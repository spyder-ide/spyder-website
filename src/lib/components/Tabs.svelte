<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  export let tabs = [];

  let current = tabs[0];
  let VideoPlayer;

  onMount(async () => {
    const module = await import("./VideoPlayer.svelte");
    VideoPlayer = module.default;
  });

  $: currentKey = current.isVideo ? JSON.stringify(current.content) : current.content;
</script>

<div class="flex gap-4 xl:gap-8 justify-evenly lg:justify-end border-b border-mine-shaft-300 dark:border-mine-shaft-600 text-sm h-8 lg:-mt-8">
  {#each tabs as tab}
    <button
      class="pb-2 border-b-2 border-neutral-500 text-neutral-500 text-sm lg:text-base"
      class:selected={current === tab}
      on:click={() => (current = tab)}
    >
      {tab.title}
    </button>
  {/each}
</div>

{#key currentKey}
  {#if current.isVideo === true}
    <div class="tab-content" in:fade="{{ duration: 200 }}">
      {#if VideoPlayer}
        <svelte:component
          this={VideoPlayer}
          videoSources={current.content.videoSources}
          videoPoster={current.content.videoPoster}
          info={false}
        />
        {#if current.content.videoCaption}
          <p class="text-neutral-600 dark:text-neutral-300 text-sm mt-3 text-center">
            {current.content.videoCaption}
          </p>
        {/if}
      {/if}
    </div>
  {:else}
    <div class="tab-content" in:fade="{{ duration: 200 }}">
      <svelte:component this={current.content} />
    </div>
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
    margin-top: 1em;
    min-height: 200px;
    @media screen and (min-width: 1024px) {
      min-height: 500px;
    };
  }
</style>
