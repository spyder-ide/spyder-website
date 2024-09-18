<script>
  import Loader from "$lib/components/Loader.svelte";
  import ContributorBlock from "$lib/blocks/ContributorBlock.svelte";
  import DonutGraph from "$lib/components/DonutGraph.svelte";

  export let data;

  let currentContributors = data.currentContributors;
  let pastContributors = data.pastContributors;
  let remainingContributors = data.remainingContributors;
  let pageIntro = data.textData.pageIntro;
  let pageTitle = data.textData.pageTitle;
  let currentTitle = data.textData.currentTitle;
  let pastTitle = data.textData.pastTitle;
  let remainingTitle = data.textData.remainingTitle;
  let remainingIntro = data.textData.remainingIntro;

  let totalContributors = data.totalContributors;
  let percentageLatinos = data.percentageLatinos;
  let percentageFemales = data.percentageFemales;
  let diversityTitle = data.textData.diversityTitle;
  let diversityIntro = data.textData.diversityIntro;

  let error = data.error;
  let loading = data.loading;
</script>

<div class="container">
  <h1
    class="text-4xl
      xl:tracking-tight
      xl:text-6xl
      text-center
      tracking-tight
      font-extralight
      text-mine-shaft-600
      dark:text-mine-shaft-200 m
      y-16 md:my-32"
  >
    {pageTitle}
  </h1>
  <h2 class="text-center dark:text-neutral-200 text-2xl font-light mb-4">
    {pageIntro}
  </h2>
  {#if error}
    <p>Error: {error}</p>
  {:else if loading}
    <Loader />
  {:else}
    {#if currentContributors && currentContributors.length > 0}
      <ContributorBlock
        title={currentTitle}
        contributors={currentContributors}
        size={"large"}
      />
    {:else}
      <Loader />
    {/if}
    {#if pastContributors && pastContributors.length > 0}
      <ContributorBlock
        title={pastTitle}
        contributors={pastContributors}
        size={"medium"}
      />
    {:else}
      <Loader />
    {/if}
    {#if remainingContributors && remainingContributors.length > 0}
      <ContributorBlock
        title={remainingTitle}
        intro={remainingIntro}
        contributors={remainingContributors}
        size={"small"}
      />
    {:else}
      <Loader />
    {/if}
    <div class="max-w-4xl mx-auto">
      <h2
        class="text-4xl
          font-extralight
          text-red-berry-900
          dark:text-neutral-400
          mt-32 mb-16 text-center"
      >
        {diversityTitle}
      </h2>
      <div class="lg:grid lg:grid-cols-5 lg:gap-8 lg:items-center">
        <div class="lg:col-span-3">
          <p class="dark:text-neutral-200 font-light mb-16">{diversityIntro}</p>
        </div>
        <div class="lg:col-span-2 flex justify-center items-center">
          <DonutGraph
            {totalContributors}
            {percentageLatinos}
            {percentageFemales}
          />
        </div>
      </div>
    </div>
  {/if}
</div>
