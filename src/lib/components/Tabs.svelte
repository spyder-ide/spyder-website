<script lang="ts">
  import { fade } from "svelte/transition";
  import { locale } from "svelte-i18n";
  import VideoPlayer from "./VideoPlayer.svelte";

  interface VideoContent {
    videoSources: Array<{ src: string; type?: string }>;
    videoPoster?: string;
    videoCaption?: string;
  }

  interface ImageContent {
    imgSrc: string;
    imgAlt: string;
    text?: string;
  }

  interface Tab {
    title: string;
    isVideo: boolean;
    content: VideoContent | ImageContent | any;
  }

  export let tabs: Tab[] = [];
  export let defaultTab = 0;

  // State
  let current: Tab | undefined;
  let currentIndex = defaultTab;
  let tabsContainer: HTMLElement;
  let tabsHeight = 0;
  let isLoading = true;
  let videoElement: HTMLElement;

  // Computed values
  $: currentKey = current?.isVideo
    ? JSON.stringify(current.content) + $locale // Add locale to force update on language change
    : current?.content;

  // Reactive statements
  $: {
    if (tabs.length) {
      // Preserve current tab index when language changes
      current = tabs[currentIndex];
    } else if (!current) {
      current = tabs[defaultTab];
      currentIndex = defaultTab;
    }
  }

  // Update height when locale or tabs change
  $: if (tabsContainer && ($locale || tabs)) {
    requestAnimationFrame(() => {
      tabsHeight = tabsContainer.offsetHeight;
    });
  }

  // Set non-video content to loaded immediately
  $: if (current && !current.isVideo) {
    isLoading = false;
  }

  // Event handlers
  function handleTabClick(tab: Tab, index: number) {
    if (current !== tab) {
      isLoading = true;
      current = tab;
      currentIndex = index;
    }
  }

  function handleVideoLoad() {
    isLoading = false;
  }
</script>

<div
  bind:this={tabsContainer}
  class="tabs-header flex gap-1 sm:gap-2 lg:gap-4 xl:gap-8 justify-evenly lg:justify-end
         border-b border-mine-shaft-300 dark:border-mine-shaft-600 text-sm
         text-gray-700"
  style="margin-top: -{tabsHeight}px"
  role="tablist"
>
  {#each tabs as tab, i}
    <button
      class="tab-button pb-2 border-b-2 border-neutral-500 text-gray-500
             text-xs sm:text-sm lg:text-base font-light"
      class:selected={current === tab}
      on:click={() => handleTabClick(tab, i)}
      aria-selected={current === tab}
      role="tab"
      id="tab-{i}"
      aria-controls="panel-{i}"
    >
      {tab.title}
    </button>
  {/each}
</div>

<div
  class="tab-content"
  role="tabpanel"
  aria-labelledby="tab-{currentIndex}"
  id="panel-{currentIndex}"
>
  {#key currentKey}
    {#if current?.isVideo === true}
      <div class="relative">
        {#if isLoading}
          <div
            class="skeleton-loader"
            in:fade={{ duration: 200 }}
            out:fade={{ duration: 200 }}
          >
            <div class="skeleton-image"></div>
          </div>
        {/if}
        <div class:invisible={isLoading} in:fade={{ duration: 200 }}>
          <div class="video-container" bind:this={videoElement}>
            <VideoPlayer
              videoSources={current.content.videoSources}
              videoPoster={current.content.videoPoster}
              info={false}
              on:load={handleVideoLoad}
            />
            {#if current.content.videoCaption}
              <p
                class="video-caption text-gray-700 dark:text-neutral-300 text-[0.95rem] mt-3 text-center"
              >
                {current.content.videoCaption}
              </p>
            {/if}
          </div>
        </div>
      </div>
    {:else}
      <div in:fade={{ duration: 200 }}>
        {#if typeof current.content !== "object"}
          <svelte:component this={current.content} />
        {:else if current.content.imgSrc}
          <figure class="figure text-center">
            <img
              src={current.content.imgSrc}
              alt={current.content.imgAlt}
              loading="lazy"
            >
            {#if current.content.text}
              <figcaption>{@html current.content.text}</figcaption>
            {/if}
          </figure>
        {/if}
      </div>
    {/if}
  {/key}
</div>

<style lang="postcss">
  .tabs-header {
    position: relative;
    z-index: 1;
  }

  .tab-button {
    transition: color 0.2s, border-color 0.2s;
  }

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
    z-index: 1;
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

  .video-container {
    width: 100%;
    height: 100%;
  }

  .invisible {
    visibility: hidden;
  }

  .video-caption {
    max-width: 80ch;
    margin-left: auto;
    margin-right: auto;
  }
</style>
