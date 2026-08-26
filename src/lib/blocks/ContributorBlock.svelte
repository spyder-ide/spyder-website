<script>
  import ContributorCard from "$lib/components/ContributorCard.svelte";

  export let title;
  export let intro = "";
  export let contributors;
  export let size = "medium";

  const LARGE_COLUMNS = 4;

  const largeGridSizeClassByColumns = {
    3: "grid grid-cols-1 sm:grid-cols-3 sm:gap-6 lg:gap-8",
    4: "grid grid-cols-1 sm:grid-cols-4 sm:gap-6 lg:gap-8",
  };

  const largeLastRowColSpanByColumns = {
    3: "col-span-1 sm:col-span-3",
    4: "col-span-1 sm:col-span-4",
  };

  $: largeGridSizeClass = largeGridSizeClassByColumns[LARGE_COLUMNS];
  $: largeLastRowColSpanClass = largeLastRowColSpanByColumns[LARGE_COLUMNS];

  $: largeRemainder =
    size === "large" ? contributors.length % LARGE_COLUMNS : 0;
  $: largeMainContributors =
    size === "large" && largeRemainder > 0
      ? contributors.slice(0, -largeRemainder)
      : contributors;
  $: largeLastRowContributors =
    size === "large" && largeRemainder > 0
      ? contributors.slice(-largeRemainder)
      : [];

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

  $: gridSizeClass = {
    small: "grid grid-cols-8 sm:grid-cols-12 lg:grid-cols-23",
    medium: "flex flex-wrap sm:gap-6 lg:gap-8",
    large: largeGridSizeClass
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
    {#if size === "large"}
      {#each largeMainContributors as contributor}
        <div class="item">
          <ContributorCard {contributor} {size} />
        </div>
      {/each}
      {#if largeLastRowContributors.length > 0}
        <div
          class="{largeLastRowColSpanClass} flex flex-col sm:flex-row flex-wrap justify-center sm:gap-6 lg:gap-8 gap-3"
        >
          {#each largeLastRowContributors as contributor}
            <div class="item">
              <ContributorCard {contributor} {size} />
            </div>
          {/each}
        </div>
      {/if}
    {:else}
      {#each contributors as contributor}
        <div class="item" class:w-[280px]={size === "medium"}>
          <ContributorCard {contributor} {size} />
        </div>
      {/each}
    {/if}
  </div>
</div>
{/if}
