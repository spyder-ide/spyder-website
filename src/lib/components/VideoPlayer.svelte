<script>
  import { onMount, onDestroy } from "svelte";
  import { Icon } from "svelte-icons-pack";
  import { BsPlayCircleFill, BsPauseCircleFill } from "svelte-icons-pack/bs";

  // Props
  export let videoSources = [];
  export let videoPoster = "";
  export let progress = true;
  export let info = true;

  // These values are bound to properties of the video
  let time = 0;
  let autoplay = false;
  let userPaused = false;
  let paused = true;
  let duration;
  let showControls = false;
  let showControlsTimeout;
  let videoElement;
  let observer;

  // Used to track time of last mouse down event
  let lastMouseDown;

  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      if (videoElement && paused && !userPaused) {
        videoElement.play();
      }
    } else {
      if (videoElement && !paused) {
        videoElement.pause();
        // We don't set userPaused here because
        // this pause is automatic, not user-initiated
      }
    }
  };

  function handleMove(e) {
    // Make the controls visible, but fade out after
    // 2 seconds of inactivity
    clearTimeout(showControlsTimeout);
    showControlsTimeout = setTimeout(() => (showControls = false), 2000);
    showControls = true;

    if (!duration) return; // video not loaded yet
    if (e.type !== "touchmove" && !(e.buttons & 1)) return; // mouse not down

    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const { left, right } = this.getBoundingClientRect();
    time = (duration * (clientX - left)) / (right - left);
  }

  // we can't rely on the built-in click event, because it fires
  // after a drag — we have to listen for clicks ourselves
  const handleMousedown = (e) => {
    lastMouseDown = new Date();
  };

  const handleMouseup = (e) => {
    if (new Date() - lastMouseDown < 300) {
      if (paused) {
        e.target.play();
        userPaused = false;
      } else {
        e.target.pause();
        userPaused = true;
      }
    }
  };

  // format time as `01:23` or `01:23:45` and so on
  const format = (seconds) => {
    if (isNaN(seconds)) return "...";

    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) seconds = "0" + seconds;

    return `${minutes}:${seconds}`;
  };

  // Observe the video element and pause it
  // when it's no longer in the viewport
  onMount(() => {
    observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this value to change when the video plays/pauses
    });

    if (videoElement) {
      observer.observe(videoElement);
    }
  });

  // Stop observing the video element when it's destroyed
  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });
</script>

<div class="video-container relative">
  <video
    bind:this={videoElement}
    {autoplay}
    loop
    muted
    playsinline
    poster={videoPoster}
    on:mousemove={handleMove}
    on:touchmove|preventDefault={handleMove}
    on:mousedown={handleMousedown}
    on:mouseup={handleMouseup}
    on:ended={() => {
      userPaused = false;
    }}
    bind:currentTime={time}
    bind:duration
    bind:paused
  >
    {#each videoSources as source}
      {#if source.src !== undefined}
        <source src={source.src} type={source.type || "video/mp4"} />
      {/if}
    {/each}
    <track kind="captions" />
    {#if videoSources[0] !== undefined}
      Your browser does not support the video tag. Download the
      <a href={videoSources[0].src} download>video file</a> instead.
    {/if}
  </video>

  <div class="controls" style="opacity: {duration && showControls ? 1 : 0}">
    <button
      class="p-4"
      on:click={() => {
        paused = !paused;
        userPaused = paused;
      }}
    >
      <Icon
        src={paused ? BsPlayCircleFill : BsPauseCircleFill}
        size="1.5em"
        color="#8c0000"
        class="cursor-pointer"
      />
    </button>

    {#if info}
      <div class="info flex justify-between">
        <span>click anywhere to {paused ? "play" : "pause"} / drag to seek</span
        >
        <div>
          <span class="time">{format(time)}</span>
          <span>/</span>
          <span class="time">{format(duration)}</span>
        </div>
      </div>
    {/if}

    {#if progress}
      <progress value={time / duration || 0} />
    {/if}
  </div>
</div>

<style>
  .controls {
    position: absolute;
    bottom: 0;
    width: 100%;
    pointer-events: none;
    transition: opacity 1s;
    cursor: pointer;
  }

  span {
    padding: 0.2em 0.5em;
    color: white;
    font-size: 0.75em;
  }

  .time {
    width: 3em;
  }

  .time:last-child {
    text-align: right;
  }

  progress {
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 3px;
    -webkit-appearance: none;
    appearance: none;
  }

  progress::-webkit-progress-bar,
  progress::-moz-progress-bar {
    background-color: rgb(140, 0, 0);
  }

  progress::-webkit-progress-value,
  progress::-moz-progress-value {
    background-color: rgb(255, 255, 255);
  }

  video {
    width: 100%;
  }
</style>
