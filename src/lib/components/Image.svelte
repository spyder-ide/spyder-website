<script>
  import { colourScheme } from '$lib/store';
  import Loader from "./Loader.svelte";

  export let imgSrc = "";
  export let imgSrcDark = "";
  export let imgAlt = "";
  export let title = "";
  export let blur = false;
  export let shadow = false;
  export let rounded = true;
  export let contain = false;
  export let figure = true;
  export let classes = "";
  export let caption = "";

  $: currentImgSrc = $colourScheme === 'dark' && imgSrcDark ? imgSrcDark : imgSrc;
</script>

{#if currentImgSrc}
  {#if figure}
    <figure class="grid grid-flow-col justify-center items-center">
      <img
        src={currentImgSrc}
        class:rounded-md={rounded}
        class:shadow-lg={shadow}
        class:blur-md={blur}
        class:shadow-md={shadow}
        class:object-contain={contain}
        class:object-center={contain}
        class={classes}
        alt={imgAlt || title || ""}
        loading="lazy"
      />
      {#if caption}
        <figcaption>{caption}</figcaption>
      {/if}
    </figure>
  {:else}
    <img
      src={currentImgSrc}
      class:rounded-md={rounded}
      class:shadow-lg={shadow}
      class:blur-md={blur}
      class:shadow-md={shadow}
      class:object-contain={contain}
      class:object-center={contain}
      class={classes}
      alt={imgAlt || title || ""}
      loading="lazy"
    />
  {/if}
{:else}
  <Loader />
{/if}
