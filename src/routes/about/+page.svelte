<script>
  import Loader from "$lib/components/Loader.svelte";
  import ContributorBlock from "$lib/blocks/ContributorBlock.svelte";

  export let data;

  let pageTitle = "About Spyder IDE";
  let pageIntro = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo debitis
      eligendi dolorem optio adipisci voluptatem inventore eius recusandae
      reiciendis nisi aspernatur quas exercitationem nihil dolorum aliquam, ex
      aliquid qui distinctio.`;

  let currentTitle = "Current Contributors";
  let currentIntro = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo debitis
      eligendi dolorem optio adipisci voluptatem inventore eius recusandae
      reiciendis nisi aspernatur quas exercitationem nihil dolorum aliquam, ex
      aliquid qui distinctio.`;

  let pastTitle = "Past Contributors";
  let pastIntro = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo debitis
      eligendi dolorem optio adipisci voluptatem inventore eius recusandae
      reiciendis nisi aspernatur quas exercitationem nihil dolorum aliquam, ex
      aliquid qui distinctio.`;

  let remainingTitle = "We are an open source project";
  let remainingIntro = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo debitis
      eligendi dolorem optio adipisci voluptatem inventore eius recusandae
      reiciendis nisi aspernatur quas exercitationem nihil dolorum aliquam, ex
      aliquid qui distinctio.`;
</script>

<div class="container">
  <h1
    class="text-4xl xl:tracking-tight xl:text-6xl text-center tracking-tight font-extralight text-mine-shaft-600 dark:text-mine-shaft-200 my-16 md:my-32"
  >
    {pageTitle}
  </h1>
  <h2 class="text-center dark:text-neutral-200 text-2xl font-light mb-4">
    {pageIntro}
  </h2>
  {#if data.error}
    <p>Error: {data.error}</p>
  {:else if data.loading}
    <Loader />
  {:else}
    {#if data.currentContributors && data.currentContributors.length > 0}
      <ContributorBlock
        title={currentTitle}
        intro={currentIntro}
        contributors={data.currentContributors}
        size={"large"}
      />
    {:else}
      <Loader />
    {/if}
    {#if data.pastContributors && data.pastContributors.length > 0}
      <ContributorBlock
        title={pastTitle}
        intro={pastIntro}
        contributors={data.pastContributors}
        size={"medium"}
      />
    {:else}
      <Loader />
    {/if}
    {#if data.remainingContributors && data.remainingContributors.length > 0}
      <ContributorBlock
        title={remainingTitle}
        intro={remainingIntro}
        contributors={data.remainingContributors}
        size={"small"}
      />
    {:else}
      <Loader />
    {/if}
  {/if}
</div>
