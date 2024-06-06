<script>
  export let videoSources = [];
  export let videoPoster = "";

  // These values are bound to properties of the video
  let time = 0;
  let duration;
  let paused = true;
  let showControls = true;
  let showControlsTimeout;

  // Used to track time of last mouse down event
  let lastMouseDown;

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
  function handleMousedown(e) {
    lastMouseDown = new Date();
  }

  function handleMouseup(e) {
    if (new Date() - lastMouseDown < 300) {
      if (paused) e.target.play();
      else e.target.pause();
    }
  }

  // format time as `01:23` or `01:23:45` and so on
  function format(seconds) {
    if (isNaN(seconds)) return "...";

    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) seconds = "0" + seconds;

    return `${minutes}:${seconds}`;
  }
</script>

<div>
  <video
    poster={videoPoster}
    on:mousemove={handleMove}
    on:touchmove|preventDefault={handleMove}
    on:mousedown={handleMousedown}
    on:mouseup={handleMouseup}
    bind:currentTime={time}
    bind:duration
    bind:paused
  >
    {#each videoSources as source}
      <source src={source.src} type={source.type || "video/mp4"} />
    {/each}
    <track kind="captions" />
    Your browser does not support the video tag. Download the
    <a href={videoSources[0].src} download>video file</a> instead.
  </video>

  <div class="controls" style="opacity: {duration && showControls ? 1 : 0}">
    <div class="info flex justify-between">
      <span class="time">{format(time)}</span>
      <span>click anywhere to {paused ? "play" : "pause"} / drag to seek</span>
      <span class="time">{format(duration)}</span>
    </div>

    <progress value={time / duration || 0} />
  </div>
</div>

<style>
  div {
    position: relative;
  }

  .controls {
    position: absolute;
    bottom: 0;
    width: 100%;
    transition: opacity 1s;
  }

  span {
    padding: 0.2em 0.5em;
    color: white;
    text-shadow: 0 0 8px black;
    opacity: 0.7;
  }

  .time {
    width: 3em;
  }

  .time:last-child {
    text-align: right;
  }

  progress {
    display: block;
    width: 100%;
    height: 10px;
    -webkit-appearance: none;
    appearance: none;
  }

  progress::-webkit-progress-bar {
    background-color: rgba(0, 0, 0, 0.2);
  }

  progress::-webkit-progress-value {
    background-color: rgba(255, 255, 255, 0.6);
  }

  video {
    width: 100%;
  }
</style>
