<script>
  import ContributorCard from "$lib/components/ContributorCard.svelte";

  export let title;
  export let intro;
  export let contributors;
  export let size = "medium";

  function isLastRow(index, columns) {
    const total = contributors.length;
    const lastRowStart = Math.floor(total / columns) * columns;
    return index >= lastRowStart;
  }
</script>

<div
  class="flex flex-col items-center mx-auto"
  class:max-w-6xl={size === "medium"}
  class:max-w-full={size === "large"}
>
  {#if title}
    <h2 class="text-4xl text-red-berry-900 dark:text-neutral-400 mt-32 mb-16">
      {title}
    </h2>
  {/if}
  {#if intro}
    <h2
      class="text-center dark:text-neutral-200 font-light mb-24 mx-auto"
      class:max-w-4xl={size === "medium" || size === "small"}
      class:max-w-6xl={size === "large"}
      class:text-md={size === "small"}
      class:text-xl={size === "medium" || size === "large"}
    >
      {intro}
    </h2>
  {/if}
  <div
    class="grid grid-cols-1 gap-3 justify-center justify-items-center"
    class:sm:grid-cols-2={size === "medium" || size === "large"}
    class:sm:gap-3={size === "medium" || size === "large"}
    class:lg:gap-4={size === "medium" || size === "large"}
    class:xl:gap-6={size === "medium" || size === "large"}
    class:md:grid-cols-3={size === "large"}
    class:md:grid-cols-4={size === "medium"}
    class:grid-cols-8={size === "small"}
    class:sm:grid-cols-12={size === "small"}
    class:lg:grid-cols-23={size === "small"}
  >
    {#each contributors as contributor, index}
      <div
        class="item w-full"
        class:col-span-3={(size === "large" && isLastRow(index, 3))}
        class:col-span-2={(size === "medium" && isLastRow(index, 4))}
      >
        <ContributorCard {contributor} {size} />
      </div>
    {/each}
  </div>
</div>

<style>
  /* Center items that span multiple columns */
  .col-span-3 {
    grid-column: span 3 / span 3;
    justify-self: center;
  }

  .col-span-2 {
    grid-column: span 2 / span 2;
    justify-self: center;
  }
</style>