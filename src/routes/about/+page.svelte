<script>
  import Loader from '$lib/components/Loader.svelte';
  import ContributorCard from '$lib/components/ContributorCard.svelte';

  export let data;
  let pageTitle = "About Spyder IDE";
</script>

{#if data.contributors}
  <div class="container">
    <h1 class="text-4xl xl:tracking-tight xl:text-6xl text-center tracking-tight font-extralight text-mine-shaft-600 dark:text-mine-shaft-200 my-16 md:my-32">
      {pageTitle}
    </h1>
    <h2 class="text-center dark:text-neutral-200 text-2xl font-light mb-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo debitis eligendi dolorem optio adipisci voluptatem inventore eius recusandae reiciendis nisi aspernatur quas exercitationem nihil dolorum aliquam, ex aliquid qui distinctio.
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-32">
      {#each data.contributors as contributor}
        <ContributorCard {contributor} />
      {/each}
    </div>
  </div>
{:else}
  <Loader />
{/if}