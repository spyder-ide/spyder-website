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
    isLoading = false;
  });

  $: currentKey = current.isVideo
    ? JSON.stringify(current.content)
    : current.content;

  function handleTabClick(tab) {
    isLoading = true;
    current = tab;

    // Preload video sources for the selected tab
    if (tab.isVideo && tab.content.videoSources) {
      tab.content.videoSources.forEach((source) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "fetch";
        link.href = source.src;
        document.head.appendChild(link);
      });
    }

    // Use setTimeout to allow the UI to update and show the loader
    setTimeout(() => {
      isLoading = false;
    }, 200);
  }
</script>

<div
  class="flex gap-1 sm:gap-2 lg:gap-4 xl:gap-8 justify-evenly lg:justify-end
         border-b border-mine-shaft-300 dark:border-mine-shaft-600 text-sm
         text-gray-700 lg:h-8 lg:-mt-8"
>
  {#each tabs as tab}
    <button
      class="pb-2 border-b-2 border-neutral-500 text-gray-500
             text-xs sm:text-sm lg:text-base font-light"
      class:selected={current === tab}
      on:click={() => handleTabClick(tab)}
    >
      {tab.title}
    </button>
  {/each}
</div>

<div class="tab-content">
  {#if isLoading}
    <div
      class="skeleton-loader"
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
    >
      <div class="skeleton-image"></div>
    </div>
  {:else}
    {#key currentKey}
      {#if current.isVideo === true}
        <div in:fade={{ duration: 200 }}>
          {#if VideoPlayer}
            <svelte:component
              this={VideoPlayer}
              videoSources={current.content.videoSources}
              videoPoster={current.content.videoPoster}
              info={false}
            />
            {#if current.content.videoCaption}
              <p
                class="text-gray-700 dark:text-neutral-300 text-[0.95rem] mt-3 text-center"
              >
                {current.content.videoCaption}
              </p>
            {/if}
          {/if}
        </div>
      {:else}
        <div in:fade={{ duration: 200 }}>
          {#if typeof current.content !== "object"}
            <svelte:component this={current.content} />
          {:else}
            {#if current.content.imgSrc}
              <figure class="figure text-center">
                <img src={current.content.imgSrc} alt={current.content.imgAlt}>
                {#if current.content.text}
                  <figcaption>{@html current.content.text}</figcaption>
                {/if}
              </figure>
            {/if}
          {/if}
        </div>
      {/if}
    {/key}
  {/if}
</div>

<style>
  .selected {
    border-color: theme("colors.red-berry.500");
    color: theme("colors.gray.700");
    @apply dark:text-neutral-300;
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
    height: 80%;
    @apply bg-gradient-to-r from-spring-wood-50 dark:from-mine-shaft-950 from-25% to-spring-wood-100 dark:to-mine-shaft-900 to-75%;
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
