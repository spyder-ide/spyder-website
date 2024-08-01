<script>
  import Loader from "./Loader.svelte";

  export let imgSrc, imgAlt, title = "";
  export let blur = false;
  export let shadow = false;
  export let rounded = true;
  export let contain = false;
  export let classes = "";
  export let caption = "";
</script>

{#if imgSrc}
  <figure class="grid justify-center items-center">
    <img
      src={imgSrc}
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
  <Loader />
{/if}