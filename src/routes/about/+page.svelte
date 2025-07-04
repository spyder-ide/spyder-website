<script>
  import { _, json, waitLocale } from "svelte-i18n";

  import ContributorBlock from "$lib/blocks/ContributorBlock.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import Metadata from "$lib/components/Metadata.svelte";

  import { contributors } from "$lib/config";
  import { metadata } from "$lib/store";
  import {
      createContributorsMap,
      mergeContributorData,
      processContributors,
  } from "$lib/utils";

  /** @type {import('./$types').PageData} */
  export let data;

  // Page content
  let pageIntro,
    pageTitle,
    currentTitle,
    pastTitle,
    remainingTitle,
    remainingIntro;

  // Contributor data
  let currentRawContributors, pastRawContributors;
  let currentTranslatedContributors, pastTranslatedContributors;
  let currentContributorsMap, pastContributorsMap;
  let currentContributors, pastContributors, remainingContributors;
  let updatedCurrent, updatedPast;

  // State
  let contributorsLoading = true;
  let error = null;

  const allContributors = data.contributors;

  $: {
    // Load page content
    pageIntro = $_("about.pageIntro");
    pageTitle = $_("about.pageTitle");
    currentTitle = $_("about.currentTitle");
    pastTitle = $_("about.pastTitle");
    remainingTitle = $_("about.remainingTitle");
    remainingIntro = $_("about.remainingIntro");

    // Load contributor data
    currentRawContributors = contributors.current;
    pastRawContributors = contributors.past;
    currentTranslatedContributors = $json("contributors.current");
    pastTranslatedContributors = $json("contributors.past");

    // Create contributor maps
    currentContributorsMap = createContributorsMap(
      currentTranslatedContributors,
    );

    pastContributorsMap = createContributorsMap(pastTranslatedContributors);

    // Merge contributor data with translations
    currentContributors = mergeContributorData(
      currentRawContributors,
      currentContributorsMap,
    );

    pastContributors = mergeContributorData(
      pastRawContributors,
      pastContributorsMap,
    );

    // Process all contributors
    if (allContributors && currentContributors && pastContributors) {
      const processedContributors = processContributors(
        currentContributors,
        pastContributors,
        allContributors,
      );

      updatedCurrent = processedContributors.updatedCurrent;
      updatedPast = processedContributors.updatedPast;
      remainingContributors = processedContributors.remainingContributors;
      
      // Set loading to false once data is processed
      contributorsLoading = false;
    }

    // Set page metadata
    metadata.setMetadata({
      ...data.metadata,
      description: pageIntro
    });
  }
</script>

<Metadata />

{#await waitLocale()}
  <div class="flex justify-center items-center min-h-screen">
    <Loader />
    <p class="ml-4 text-gray-600 dark:text-gray-300">Loading translations...</p>
  </div>
{:then}
  <div class="container">
    <h1
      class="text-4xl
        xl:tracking-tight
        xl:text-6xl
        text-center
        tracking-tight
        font-extralight
        text-mine-shaft-600
        dark:text-mine-shaft-200 my-16 xl:my-32"
    >
      {pageTitle}
    </h1>
    <h2
      class="text-center dark:text-neutral-200 text-xl font-light mb-4 max-w-6xl mx-auto"
    >
      {@html pageIntro}
    </h2>
    {#if error}
      <p class="text-center text-red-500 my-8">Error: {error}</p>
    {:else if contributorsLoading}
      <div class="flex justify-center items-center my-16">
        <Loader />
        <p class="ml-4 text-gray-600 dark:text-gray-300">Loading contributor data...</p>
      </div>
    {:else}
      {#if updatedCurrent && updatedCurrent.length > 0}
        <ContributorBlock
          title={currentTitle}
          contributors={updatedCurrent}
          size={"large"}
        />
      {/if}
      {#if updatedPast && updatedPast.length > 0}
        <ContributorBlock
          title={pastTitle}
          contributors={updatedPast}
          size={"medium"}
        />
      {/if}
      {#if remainingContributors && remainingContributors.length > 0}
        <ContributorBlock
          title={remainingTitle}
          intro={remainingIntro}
          contributors={remainingContributors}
          size={"small"}
        />
      {/if}
    {/if}
  </div>
{/await}
