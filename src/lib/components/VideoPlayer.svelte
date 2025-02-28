<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { Icon } from "svelte-icons-pack";
  import { BsPlayCircleFill, BsPauseCircleFill } from "svelte-icons-pack/bs";

  interface VideoSource {
    src: string;
    type?: string;
  }

  const dispatch = createEventDispatcher<{
    load: void;
  }>();

  // Props
  export let videoSources: VideoSource[] = [];
  export let videoPoster = "";
  export let progress = true;
  export let info = true;
  export let aspectRatio = "4:3"; // Default aspect ratio

  // State
  let time = 0;
  let autoplay = false;
  let userPaused = false;
  let paused = true;
  let duration: number | undefined;
  let showControls = false;
  let showControlsTimeout: ReturnType<typeof setTimeout>;
  let videoElement: HTMLVideoElement;
  let observer: IntersectionObserver;
  let isVideoReady = false;
  let lastMouseDown: Date;

  // Computed values
  $: aspectRatioPadding = (() => {
    const [width, height] = aspectRatio.split(':').map(Number);
    return (height / width * 100) + '%';
  })();

  // Event handlers
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      if (videoElement && paused && !userPaused) {
        videoElement.play().catch(() => {
          // Ignore autoplay errors - they're expected in some browsers
        });
      }
    } else {
      if (videoElement && !paused) {
        videoElement.pause();
        // We don't set userPaused here because
        // this pause is automatic, not user-initiated
      }
    }
  };

  function handleMove(e: MouseEvent | TouchEvent) {
    // Make the controls visible
    showControls = true;

    // Only set the timeout to hide controls if the video is playing
    if (!paused) {
      clearTimeout(showControlsTimeout);
      showControlsTimeout = setTimeout(() => (showControls = false), 2000);
    }

    if (!duration) return; // video not loaded yet
    if (e instanceof MouseEvent && !(e.buttons & 1)) return; // mouse not down

    const clientX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
    const { left, right } = (e.currentTarget as HTMLElement).getBoundingClientRect();
    time = (duration * (clientX - left)) / (right - left);
  }

  function handleMousedown() {
    lastMouseDown = new Date();
  }

  function handleMouseup(e: MouseEvent) {
    if (new Date().getTime() - lastMouseDown.getTime() < 300) {
      if (paused) {
        (e.target as HTMLVideoElement).play().catch(() => {
          // Handle play errors gracefully
          userPaused = true;
        });
        userPaused = false;
      } else {
        (e.target as HTMLVideoElement).pause();
        userPaused = true;
      }
    }
  }

  function handleVideoReady() {
    if (!isVideoReady && videoElement && videoElement.readyState >= 3) {
      isVideoReady = true;
      dispatch('load');
    }
  }

  // Utility functions
  function formatTime(seconds: number): string {
    if (isNaN(seconds)) return "...";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Lifecycle
  onMount(() => {
    observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      clearTimeout(showControlsTimeout);
    };
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
    clearTimeout(showControlsTimeout);
  });

  // Reactive statements
  $: if (videoSources) {
    isVideoReady = false;
  }

  $: if (userPaused) {
    showControls = true;
    clearTimeout(showControlsTimeout);
  }

  $: if (duration) {
    handleVideoReady();
  }
</script>

{#if videoSources.length > 0}
  <div class="video-wrapper">
    <div class="video-container" style="padding-top: {aspectRatioPadding}">
      <video
        bind:this={videoElement}
        {autoplay}
        loop
        muted
        playsinline
        preload="auto"
        poster={videoPoster}
        on:mousemove={handleMove}
        on:touchmove|preventDefault={handleMove}
        on:mousedown={handleMousedown}
        on:mouseup={handleMouseup}
        on:loadedmetadata={handleVideoReady}
        on:loadeddata={handleVideoReady}
        on:canplay={handleVideoReady}
        on:canplaythrough={handleVideoReady}
        on:ended={() => {
          userPaused = false;
        }}
        bind:currentTime={time}
        bind:duration
        bind:paused
      >
        {#each videoSources as source}
          {#if source.src}
            <source src={source.src} type={source.type || "video/mp4"} />
          {/if}
        {/each}
      </video>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        role="button"
        tabindex="0"
        class="controls"
        style="opacity: {duration && showControls ? 1 : 0}"
        on:mousemove|stopPropagation={() => {
          showControls = true;
          clearTimeout(showControlsTimeout);
        }}
      >
        <button
          class="control-button"
          on:click={() => {
            paused = !paused;
            userPaused = paused;
            showControls = true;
          }}
        >
          <Icon
            src={paused ? BsPlayCircleFill : BsPauseCircleFill}
            size="1.5em"
            color="#fff"
          />
        </button>

        {#if info}
          <div class="info">
            <span class="info-text">
              click anywhere to {paused ? "play" : "pause"} / drag to seek
            </span>
            <div class="time-display">
              <span class="time">{formatTime(time)}</span>
              <span class="time-separator">/</span>
              <span class="time">{formatTime(duration || 0)}</span>
            </div>
          </div>
        {/if}

        {#if progress}
          <progress class="progress-bar" value={time / (duration || 1)}></progress>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .video-wrapper {
    width: 100%;
  }

  .video-container {
    position: relative;
    width: 100%;
    height: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
    transition: opacity 0.3s ease;
    pointer-events: auto;
  }

  .control-button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    transition: transform 0.2s ease;
  }

  .control-button:hover {
    transform: scale(1.1);
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
  }

  .info-text {
    color: white;
    font-size: 0.75rem;
    opacity: 0.9;
  }

  .time-display {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .time {
    color: white;
    font-size: 0.75rem;
    min-width: 3em;
    text-align: center;
  }

  .time-separator {
    color: white;
    opacity: 0.7;
  }

  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
  }

  .progress-bar::-webkit-progress-bar {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .progress-bar::-webkit-progress-value {
    background-color: rgb(200, 0, 0);
    transition: width 0.1s linear;
  }

  .progress-bar::-moz-progress-bar {
    background-color: rgb(200, 0, 0);
  }

  @media (hover: hover) {
    .controls {
      opacity: 0;
    }

    .video-container:hover .controls {
      opacity: 1;
    }
  }
</style>
