<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  export let tabs = [];

  let current = tabs[0];
  let VideoPlayer;
  let isLoading = true;

  onMount(async () => {
    const module = await import("./VideoPlayer.svelte");
    VideoPlayer = module.default;

    // Preload video sources
    tabs.forEach(tab => {
      if (tab.isVideo && tab.content.videoSources) {
        tab.content.videoSources.forEach(source => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'video';
          link.href = source.src;
          document.head.appendChild(link);
        });
      }
    });

    isLoading = false;
  });

  $: currentKey = current.isVideo ? JSON.stringify(current.content) : current.content;

  function handleTabClick(tab) {
    isLoading = true;
    current = tab;
    // Use setTimeout to allow the UI to update and show the loader
    setTimeout(() => {
      isLoading = false;
    }, 200);
  }
</script>

<div class="flex gap-4 xl:gap-8 justify-evenly lg:justify-end border-b border-mine-shaft-300 dark:border-mine-shaft-600 text-sm h-8 lg:-mt-8">
  {#each tabs as tab}
    <button
      class="pb-2 border-b-2 border-neutral-500 text-neutral-500 text-sm lg:text-base"
      class:selected={current === tab}
      on:click={() => handleTabClick(tab)}
    >
      {tab.title}
    </button>
  {/each}
</div>

<div class="tab-content">
  {#if isLoading}
    <div class="skeleton-loader" in:fade="{{ duration: 200 }}" out:fade="{{ duration: 200 }}">
      <div class="skeleton-image"></div>
    </div>
  {:else}
    {#key currentKey}
      {#if current.isVideo === true}
        <div in:fade="{{ duration: 200 }}">
          {#if VideoPlayer}
            <svelte:component
              this={VideoPlayer}
              videoSources={current.content.videoSources}
              videoPoster={current.content.videoPoster}
              info={false}
            />
            {#if current.content.videoCaption}
              <p class="text-neutral-600 dark:text-neutral-300 text-[0.95rem] mt-3 text-center">
                {current.content.videoCaption}
              </p>
            {/if}
          {/if}
        </div>
      {:else}
        <div in:fade="{{ duration: 200 }}">
          <svelte:component this={current.content} />
        </div>
      {/if}
    {/key}
  {/if}
</div>

<style>
  .selected {
    border-color: theme("colors.red-berry.500");
    color: theme("colors.neutral.900");
    @apply dark:text-quill-gray-200;
  }
  .tab-content {
    @apply w-full h-full relative;
    margin-top: 1em;
    min-height: 200px;
    @media screen and (min-width: 1024px) {
      min-height: 500px;
    }
  }
  .skeleton-loader {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .skeleton-image {
    width: 100%;
    height: 60%;
    background: linear-gradient(90deg, #f7f7f2 25%, #efefe5 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
</style>
