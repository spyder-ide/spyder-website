<script>
  import ContributorCard from "$lib/components/ContributorCard.svelte";

  export let title;
  export let intro = "";
  export let contributors;
  export let size = "medium";

  function isLastRow(index, columns) {
    if (contributors.length === 0) {
      console.error("There are no contributors to count");
      return
    };
    const total = contributors.length;
    const lastRowStart = Math.floor(total / columns) * columns;
    return index >= lastRowStart;
  }
</script>

{#if contributors && contributors.length > 0}
<div
  class="flex flex-col items-center mx-auto"
  class:max-w-6xl={size === "medium"}
  class:max-w-full={size === "large"}
>
  {#if title}
    <h2 class="text-4xl text-center text-red-berry-900 dark:text-neutral-400 mt-32 mb-16">
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
      {@html intro}
    </h2>
  {/if}
  <div
    class="gap-3 justify-center justify-items-center"
    class:grid={size === "large" || size === "small"}
    class:grid-cols-1={size === "large" || size === "small"}
    class:flex={size === "medium"}
    class:flex-wrap={size === "medium"}
    class:sm:grid-cols-3={size === "large"}
    class:sm:gap-6={size === "medium" || size === "large"}
    class:lg:gap-8={size === "medium" || size === "large"}
    class:md:grid-cols-3={size === "large"}
    class:grid-cols-8={size === "small"}
    class:sm:grid-cols-12={size === "small"}
    class:lg:grid-cols-23={size === "small"}
  >
    {#each contributors as contributor, index}
      <div class="item" class:w-[280px]={size === "medium"}>
        <ContributorCard {contributor} {size} />
      </div>
    {/each}
  </div>
</div>
{/if}
