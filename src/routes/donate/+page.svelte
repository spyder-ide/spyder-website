<script>
  import { _, json } from "svelte-i18n";
  import { metadata } from "$lib/store";
  import { page } from "$app/stores";
  import { ogImage, config } from "$lib/config";

  import Metadata from "$lib/components/Metadata.svelte";
  import ProjectCard from "$lib/components/ProjectCard.svelte";

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

  <div class="intro text-center dark:text-neutral-200 text-lg md:text-xl font-light max-w-6xl mx-auto flex flex-col gap-4 mb-16 md:mb-32">
    {@html $_("donate.page.intro", { values })}
  </div>
  <div class="flex flex-wrap justify-center mt-16">
    {#each projects as project}
      <ProjectCard {project} href={`/donate/${project.term.toLowerCase()}`} />
    {/each}
  </div>
</div>
