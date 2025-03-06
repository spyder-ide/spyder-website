<script>
  import Button from "$lib/components/Button.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import ProgressBar from "$lib/components/ProgressBar.svelte";
  import { locale } from "svelte-i18n";

  export let project;
  export let href;

  let currencyOptions = { style: "currency", currency: "USD", maximumFractionDigits: 0 };

  $: progress = Math.min(project.donations.progress, 100);
</script>

<div class="group">
  <div class="card">
    <div class="card-image">
      {#await project.image}
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
        <div class="donations">
          {project.collected}:
          <span class="font-bold">{project.donations.total.toLocaleString($locale, currencyOptions)}</span>
          {#if project.donationGoal}
            {project.separator}
            <span class="font-bold">{project.donationGoal.toLocaleString($locale, currencyOptions)}</span>
            <ProgressBar {progress} />
          {/if}
        </div>
      {/if}
      {#if project.content}
        <div class="card-content">{project.content}</div>
      {/if}
      {#if project.button && href}
        <div class="button-container">
          <Button text={project.button.text} highlight={true} icon="donate" iconSize={24} textSize="lg" {href} />
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
    grid-template-rows: 1fr auto;
  }

  .card-title {
    @apply pointer-events-none absolute bottom-0 left-0 z-10 w-full bg-white/70 p-6 text-5xl font-extralight text-red-berry-900 backdrop-blur-sm md:w-auto md:rounded-tr-2xl;
  }

  .card-image {
    @apply relative aspect-square w-full md:aspect-video;
  }

  .card-content {
    @apply font-light;
  }

  .donations {
    @apply text-lg font-light;
  }

  .project-image {
    @apply absolute inset-0 aspect-square h-full w-full rounded-t-2xl object-cover md:aspect-video;
  }
</style>
