<script>
  import { page } from "$app/stores";
  import { config, ogImage } from "$lib/config";
  import { metadata } from "$lib/store";
  import { _, json, locale } from "svelte-i18n";

  import Button from "$lib/components/Button.svelte";
  import Metadata from "$lib/components/Metadata.svelte";
  import PaymentModal from "$lib/components/PaymentModal.svelte";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import SvelteMarkdown from "svelte-markdown";

  export let data;

  const props = data.props;
  const totalDonations = data?.totalDonations ?? 0;
  const pipelineDeals = data?.pipelineDeals ?? [];

  // Modal state
  let showModal = false;
  let selectedProjectDonationLinkID = null;

  $: keywords = config.site?.keywords ?? [];
  $: lastUpdated = data?.lastUpdated ? new Date(data.lastUpdated).toLocaleDateString($locale) : null;

  $: allProjects = Object.values(
    [...props.projects, ...$json("donate.projects")].reduce((acc, project) => {
      acc[project.id] = acc[project.id] ? { ...acc[project.id], ...project } : project;
      return acc;
    }, {}),
  );

  // Separate spyder project from others
  $: spyderProject = allProjects.find((project) => project.slug === "spyder");
  $: otherProjects = allProjects
    .filter((project) => project.slug !== "spyder")
    .sort((a, b) => {
      // Sort by total donations in descending order
      const aDonations = a.donations?.total || 0;
      const bDonations = b.donations?.total || 0;
      return bDonations - aDonations;
    });

  $: values = {
    totalDonations: `$${totalDonations.toLocaleString()}`,
    dealsCount: pipelineDeals.length,
    lastUpdated,
  };

  // Function to open donation modal
  const openDonationModal = (donationLinkID) => {
    selectedProjectDonationLinkID = donationLinkID;
    showModal = true;
  };

  $: metadata.setMetadata({
    title: `${$_("config.site.title")} | ${$_("donate.page.title")}`,
    description: $_("config.site.description"),
    keywords: keywords.join(", "),
    url: $page.url.href,
    image: ogImage,
  });
</script>

<Metadata />

<div class="download container mt-32">
  <h1
    class="mb-16
      text-center
      text-4xl
      font-extralight
      tracking-tight
      text-mine-shaft-600
      dark:text-mine-shaft-200
      xl:text-6xl xl:tracking-tight"
  >
    {$_("donate.page.title")}
  </h1>

  <div
    class="font-light prose prose-xl
    prose-headings:text-red-berry-900
    dark:prose-headings:text-mine-shaft-200
    dark:prose-invert prose-headings:font-medium
    prose-p:text-pretty
    prose-ul:text-left
    prose-ul:max-w-[55rem]
    prose-ul:mx-auto
    prose-li:italic
    prose-li:text-[85%]
    prose-li:text-pretty
    prose-strong:font-semibold
    prose-strong:text-mine-shaft-600
    dark:prose-strong:text-neutral-300
    mx-auto
    mb-16
    max-w-6xl
    text-center
    dark:text-neutral-200
    md:text-xl"
  >
    <SvelteMarkdown source={$_("donate.page.intro", { values })} />
  </div>

  <!-- Featured Spyder Project -->
  {#if spyderProject}
    <div class="mt-16 mb-24 flex justify-center">
      <div class="w-full max-w-6xl">
        <div class="featured-project-card group">
          <div class="card">
            <div class="card-image-large">
              {#if spyderProject.image}
                <a href={`/donate/${spyderProject.slug.toLowerCase()}`}>
                  <img class="project-image-large" src={spyderProject.image} alt={spyderProject.title} />
                </a>
              {/if}
              <h2 class="card-title-large">
                {spyderProject.title}
              </h2>
            </div>
            <div class="card-container-large">
              {#if spyderProject.donations}
                <div class="donations-large">
                  {spyderProject.collected}:
                  <br /><span class="font-semibold text-6xl"
                    >{spyderProject.donations.total.toLocaleString($locale, {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })}</span
                  >
                </div>
              {/if}
              {#if spyderProject.intro}
                <div class="card-content-large">{spyderProject.intro}</div>
              {/if}
              {#if spyderProject.button}
                <div class="button-container flex flex-col gap-4 md:flex-row">
                  {#if spyderProject.button && spyderProject.button.text && spyderProject.donationLinkID}
                    <Button
                      text={spyderProject.button.text}
                      highlight={true}
                      icon="donate"
                      iconSize={24}
                      textSize="lg"
                      isLink={false}
                      fullwidth={true}
                      on:click={() => openDonationModal(spyderProject.donationLinkID)}
                    />
                  {/if}
                  {#if spyderProject.secondaryButton && spyderProject.secondaryButton.text}
                    <Button
                      text={spyderProject.secondaryButton.text}
                      icon="more"
                      textSize="lg"
                      fullwidth={true}
                      href={`/donate/${spyderProject.slug.toLowerCase()}`}
                    />
                  {/if}
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Other Projects -->
  {#if otherProjects.length > 0}
    <div class="mt-16 flex flex-wrap justify-center">
      {#each otherProjects as project}
        <ProjectCard {project} href={`/donate/${project.slug.toLowerCase()}`} />
      {/each}
    </div>
  {/if}
</div>

<PaymentModal bind:showModal donationLinkID={selectedProjectDonationLinkID} />

<style lang="postcss">
  .featured-project-card {
    @apply w-full;
  }

  .featured-project-card .card {
    @apply grid h-full grid-cols-1 lg:grid-cols-2 rounded-2xl border border-neutral-300 shadow-2xl dark:border-neutral-700 dark:shadow-neutral-900;
  }

  .card-image-large {
    @apply relative overflow-hidden lg:rounded-l-2xl lg:rounded-tr-none rounded-t-2xl;
  }

  .project-image-large {
    @apply w-full h-full object-cover aspect-square lg:aspect-auto lg:h-full;
  }

  .card-title-large {
    @apply pointer-events-none absolute top-0 left-0 z-10 w-full bg-white/70 p-8 text-6xl font-extralight text-red-berry-900 backdrop-blur-sm lg:rounded-br-2xl lg:w-auto lg:mr-48;
  }

  .card-container-large {
    @apply grid grid-cols-1 gap-8 p-8 lg:p-12;
    grid-template-rows: auto 1fr auto;
  }

  .donations-large {
    @apply text-2xl font-light;
  }

  .card-content-large {
    @apply font-light text-lg;
  }
</style>
