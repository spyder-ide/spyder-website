<script>
  import { onMount } from "svelte";

  import { Icon } from "svelte-icons-pack";
  import { LuChevronLeft, LuChevronRight } from "svelte-icons-pack/lu";

  import Loader from "./Loader.svelte";

  let imgObject, imgAfter, imgBefore;
  let sliding = false;

  export let offset = 0.5;
  export let before = "";
  export let after = "";
  export let alt = "";

  const getImgDimensions = (e) => {
    if (!imgAfter || !imgAfter.complete) return; // Ensure the image is loaded
    imgObject = (
      e.type === "load" ? e.target : imgAfter
    ).getBoundingClientRect();
  };

  const move = (e) => {
    if (sliding && imgObject) {
      let x = (e.touches ? e.touches[0].pageX : e.pageX) - imgObject.left;
      x = x < 0 ? 0 : x > w ? w : x;
      offset = x / w;
    }
  };

  const start = (e) => {
    sliding = true;
    move(e);
  };

  const end = () => {
    sliding = false;
  };

  const loadImage = (img) => {
    if (img) {
      img.addEventListener("load", getImgDimensions);
    }
  };

  $: w = imgObject && imgObject.width;
  $: h = imgObject && imgObject.height;
  $: x = w * offset;

  onMount(() => {
    if (imgAfter) {
      loadImage(imgAfter);
      if (imgAfter.complete) {
        getImgDimensions({ target: imgAfter });
      }
    }
    if (imgBefore && imgBefore.complete) {
      getImgDimensions({ target: imgBefore });
    }
  });
</script>

<svelte:window
  on:touchmove={move}
  on:touchend={end}
  on:mousemove={move}
  on:mouseup={end}
  on:resize={getImgDimensions}
/>

<div
  role="button"
  tabindex="0"
  class="overflow-hidden relative box-content h-full rounded-lg shadow-2xl"
  on:touchstart={start}
  on:mousedown={start}
>
  <button on:mousedown|preventDefault={start}>
    {#if after}
      <img
        {alt}
        bind:this={imgAfter}
        on:load={getImgDimensions}
        src={after}
        class="block absolute inset-0 z-20 object-cover select-none w-full h-full"
      />
    {:else}
      <Loader />
    {/if}
  </button>

  <button on:mousedown|preventDefault={start}>
    {#if before}
    <img
      {alt}
      bind:this={imgBefore}
      src={before}
      class="block absolute inset-0 z-20 object-cover select-none w-full h-full"
      style="clip:rect(0, {x}px, {h}px, 0);"
    />
    {:else}
      <Loader />
    {/if}
  </button>

  <div
    class="handle absolute z-30 w-10 h-10 cursor-pointer select-none rounded-full flex items-center justify-center gap-0 bg-spring-wood-50 dark:bg-mine-shaft-900"
    style="left: calc({offset * 100}% - 20px)"
  >
    <Icon src={LuChevronLeft} />
    <Icon src={LuChevronRight} />
  </div>
</div>

<style>
  button {
    @apply w-full h-full;
  }

  .handle {
    top: calc(50% - 15px);
  }

  .handle:before,
  .handle:after {
    content: "";
    height: 9999px;
    position: absolute;
    left: calc(50% - 2px);
    @apply border-2 border-spring-wood-50 dark:border-mine-shaft-900
  }

  .handle:before {
    top: 40px;
  }

  .handle:after {
    bottom: 40px;
  }
</style>
