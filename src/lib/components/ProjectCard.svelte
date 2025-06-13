<script>
  import Button from "$lib/components/Button.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import ProgressBar from "$lib/components/ProgressBar.svelte";
  import { checkImageExists } from "$lib/utils";
  import { locale } from "svelte-i18n";

  export let project;
  export let href;
  export let onDonate = null; // Callback function for donation

  let currencyOptions = { style: "currency", currency: "USD", maximumFractionDigits: 0 };

  const imageExists = async () => ((await checkImageExists(project.image)) ? true : false);

  $: progress = Math.min(project.donations?.progress || 0, 100);
</script>

<div class="group">
  <div class="card">
    <div class="card-image">
      {#await project.image && imageExists()}
        <Loader />
      {:then}
        {#if href && project.image}
          <a {href}>
            <img class="project-image" src={project.image} alt={project.title} />
          </a>
        {:else if project.image}
          <img class="project-image" src={project.image} alt={project.title} />
        {/if}
      {/await}
      <h4 class="card-title">
        {project.title}
      </h4>
    </div>
    <div class="card-container">
      {#if project.donations}
        <div class="donations-container">
          <div class="donations flex flex-row gap-4 items-center justify-between">
            <div class="goals-container w-full">
              <div class="data-container">
                <span>{project.collected}:</span>
                {#if project.donationGoal}
                  <!-- We show the goal for the projects that have one -->
                  <span class="font-semibold">{project.donations.total.toLocaleString($locale, currencyOptions)}</span>
                  {project.separator}
                  <span class="font-semibold">{project.donationGoal.toLocaleString($locale, currencyOptions)}</span>
                {:else}
                  <!-- We don´t show the goal for the projects that don´t have one -->
                  <span class="font-semibold text-6xl">
                    {project.donations.total.toLocaleString($locale, currencyOptions)}
                  </span>
                {/if}
              </div>
              {#if project.donationGoal}
                <!-- We show the progress bar for the projects that have a goal -->
                <div class="progress-container">
                  <ProgressBar {progress} mt={1} />
                </div>
              {/if}
            </div>
            {#if project.donationLinkID && onDonate}
              <Button
                highlight={true}
                icon="donate"
                iconSize={16}
                textSize="lg"
                isLink={false}
                on:click={() => onDonate(project.donationLinkID)}
              />
            {/if}
          </div>
        </div>
      {/if}
      {#if project.intro}
        <div class="card-content">{project.intro}</div>
      {/if}
      {#if project.button && href}
        <div class="button-container">
          <Button text={project.button.text} highlight={false} icon="info" iconSize={20} textSize="md" {href} />
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="postcss">
  .group {
    @apply w-full flex-shrink-0 py-4 md:w-1/2 md:px-4 xl:w-1/3;
  }

  .card {
    @apply grid h-full grid-cols-1 rounded-2xl border border-neutral-300 shadow-2xl dark:border-neutral-700 dark:shadow-neutral-900;
    grid-template-rows: auto 1fr;
  }

  .card-container {
    @apply grid grid-cols-1 gap-8 p-8;
    grid-template-rows: auto 1fr;
  }

  .card-title {
    @apply pointer-events-none absolute bottom-0 left-0 z-10 w-full bg-white/70 p-6 text-4xl font-extralight text-red-berry-900 backdrop-blur-sm md:w-auto md:rounded-tr-2xl mr-8;
  }

  .card-image {
    @apply relative overflow-hidden border-b-4 border-red-berry-900 dark:border-neutral-700;
  }

  .project-image {
    @apply rounded-t-2xl aspect-square w-full md:aspect-video;
  }

  .card-content {
    @apply font-light;
  }

  .donations {
    @apply text-lg font-light;
  }
</style>
