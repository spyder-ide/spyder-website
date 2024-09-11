<script>
  import ContributorCard from "$lib/components/ContributorCard.svelte";

  export let title;
  export let intro;
  export let contributors;
  export let size = "medium";
</script>

<div
  class="flex flex-col items-center mx-auto"
  class:max-w-4xl={size === "medium"}
  class:max-w-6xl={size === "large"}
>
  {#if title}
    <h1 class="text-4xl font-extralight text-red-berry-900 mt-24 mb-16">
      {title}
    </h1>
  {/if}
  {#if intro}
    <h2
      class="text-center dark:text-neutral-200 font-light mb-16 mx-auto"
      class:max-w-4xl={size === "medium" || size === "small"}
      class:max-w-6xl={size === "large"}
      class:text-md={size === "small"}
      class:text-xl={size === "medium" || size === "large"}
    >
      {intro}
    </h2>
  {/if}
  <div
    class="grid grid-cols-1 sm:grid-cols-4 gap-8"
    class:md:grid-cols-12={size === "small"}
    class:lg:grid-cols-23={size === "small"}
  >
    {#each contributors as contributor}
      <ContributorCard {contributor} {size} />
    {/each}
  </div>
</div>
