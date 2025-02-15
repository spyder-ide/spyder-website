<script>
  import { _, json } from "svelte-i18n";
  import { metadata } from "$lib/store";
  import { page } from "$app/stores";
  import { ogImage, config } from "$lib/config";

  import Metadata from "$lib/components/Metadata.svelte";
  import Button from "$lib/components/Button.svelte";

  export let data;

  const props = data.props;
  const totalDonations = data?.totalDonations ?? 0;
  const pipelineDeals = data?.pipelineDeals ?? [];
  const lastUpdated = data?.lastUpdated
    ? new Date(data.lastUpdated).toLocaleDateString()
    : null;

  $: title = $_("config.site.title");
  $: description = $_("config.site.description");
  $: pageTitle = $_("donate.page.title");
  $: keywords = config.site?.keywords ?? [];

  $: projects = Object.values(
    [...props.projects, ...$json("donate.projects")].reduce((acc, project) => {
      acc[project.id] = acc[project.id]
        ? { ...acc[project.id], ...project }
        : project;
      return acc;
    }, {}),
  );

  $: values = {
    totalDonations: `$${totalDonations.toLocaleString()}`,
    dealsCount: pipelineDeals.length,
    lastUpdated,
  };

  $: metadata.setMetadata({
    title: `${title} | ${pageTitle}`,
    description: description,
    keywords: keywords.join(", "),
    url: $page.url.href,
    image: ogImage,
  });
</script>

<Metadata />

<div class="download container mt-32">
  <h1
    class="text-4xl
      xl:tracking-tight
      xl:text-6xl
      text-center
      tracking-tight
      font-extralight
      text-mine-shaft-600
      dark:text-mine-shaft-200
      mb-16 md:mb-32"
  >
    {pageTitle}
  </h1>

  <div class="intro">
    {@html $_("donate.page.intro", { values })}
  </div>
  <div class="flex flex-wrap justify-center mt-16">
    {#each projects as project}
      <div class="flex-shrink-0 w-full md:w-1/2 xl:w-1/3 py-4 md:px-4">
        <div class="card">
          <div class="card-image relative">
            {#await project.image}
              <div class="placeholder"></div>
            {:then}
              <a href="/donate/{project.term.toLowerCase()}">
                <img
                  class="project-image"
                  src={project.image}
                  alt={project.title}
                />
              </a>
            {/await}
            <h4 class="card-title">
              {project.title}
            </h4>
          </div>
          <div class="card-container">
            {#if project.donations}
              <div class="donations mb-12">
                <p class="text-lg font-light">
                  Current donations: ${project.donations.total.toLocaleString()}
                  {#if project.donationGoal}
                    of ${project.donationGoal.toLocaleString()}
                    <div class="progress-bar-container relative">
                      <div class="progress-bar mt-2">
                        <div
                          class="progress"
                          style="width: {Math.min(
                            project.donations.progress,
                            100,
                          )}%"
                        />
                      </div>
                      <div
                        class="progress-bar-text"
                        style="left: {project.donations.progress < 5
                          ? '0'
                          : `calc(${project.donations.progress}% - 16px)`}"
                      >
                        {project.donations.progress}%
                      </div>
                    </div>
                  {/if}
                </p>
              </div>
            {/if}
            {#if project.content}
              <p class="card-content">{project.content}</p>
            {/if}
            {#if project.button}
              <Button
                text={project.button.text}
                highlight={true}
                icon="donate"
                iconSize={32}
                fontSize={18}
                href={`/donate/${project.term.toLowerCase()}`}
              />
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .intro {
    @apply text-center dark:text-neutral-200 text-lg md:text-xl font-light max-w-6xl mx-auto flex flex-col gap-4 mb-16 md:mb-32;
  }

  .card {
    @apply flex flex-col h-full border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-2xl dark:shadow-neutral-900;
  }

  .card-container {
    @apply p-8;
  }

  .card-title {
    @apply font-extralight text-5xl text-red-berry-900 bg-white/70 backdrop-blur-sm md:rounded-tr-2xl p-6 z-10 absolute bottom-0 left-0 w-full md:w-auto;
  }

  .card-image {
    @apply w-full aspect-square md:aspect-video;
  }

  .card-content {
    @apply font-light mb-8;
  }

  .progress-bar {
    @apply w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-spring-wood-200;
  }

  .progress-bar-text {
    @apply absolute top-5 left-0 text-xs text-center w-8;
  }

  .progress {
    @apply h-full bg-red-berry-800 dark:bg-red-berry-900 transition-all duration-500;
  }

  .placeholder {
    @apply absolute inset-0 w-full h-full rounded-t-2xl aspect-square md:aspect-video object-cover bg-red-berry-900;
  }

  .project-image {
    @apply absolute inset-0 w-full h-full rounded-t-2xl aspect-square md:aspect-video object-cover;
  }
</style>
