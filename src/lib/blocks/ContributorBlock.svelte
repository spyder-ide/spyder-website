<script>
  import ContributorCard from "$lib/components/ContributorCard.svelte";

  export let title;
  export let intro = "";
  export let contributors;
  export let size = "medium";

  // Define size-specific classes
  const containerSizeClass = {
    medium: "max-w-6xl",
    large: "max-w-full"
  };

  const introSizeClass = {
    small: "max-w-4xl text-md",
    medium: "max-w-4xl text-xl",
    large: "max-w-6xl text-xl"
  };

  const gridSizeClass = {
    small: "grid grid-cols-1 grid-cols-8 sm:grid-cols-12 lg:grid-cols-23",
    medium: "flex flex-wrap sm:gap-6 lg:gap-8",
    large: "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 sm:gap-6 lg:gap-8"
  };
</script>

{#if contributors && contributors.length > 0}
<div
  class="flex flex-col items-center mx-auto {containerSizeClass[size]}"
>
  {#if title}
    <h2 class="text-3xl xl:text-4xl font-extralight xl:font-light text-center text-red-berry-900 dark:text-neutral-400 my-16 xl:mt-32">
      {title}
    </h2>
  {/if}

  {#if intro}
    <h2
      class="text-center dark:text-neutral-200 font-light mb-24 mx-auto {introSizeClass[size]}"
    >
      {@html intro}
    </h2>
  {/if}

  <div
    class="gap-3 justify-center justify-items-center {gridSizeClass[size]}"
  >
    {#each contributors as contributor}
      <div class="item" class:w-[280px]={size === "medium"}>
        <ContributorCard {contributor} {size} />
      </div>
    {/each}
  </div>
</div>
{/if}
