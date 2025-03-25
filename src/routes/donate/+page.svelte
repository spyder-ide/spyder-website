<script>
  import { page } from "$app/stores";
  import { config, ogImage } from "$lib/config";
  import { metadata } from "$lib/store";
  import { _, json, locale } from "svelte-i18n";

  import Metadata from "$lib/components/Metadata.svelte";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import SvelteMarkdown from "svelte-markdown";

  export let data;

  const props = data.props;
  const totalDonations = data?.totalDonations ?? 0;
  const pipelineDeals = data?.pipelineDeals ?? [];

  $: keywords = config.site?.keywords ?? [];
  $: lastUpdated = data?.lastUpdated ? new Date(data.lastUpdated).toLocaleDateString($locale) : null;

  $: projects = Object.values(
    [...props.projects, ...$json("donate.projects")].reduce((acc, project) => {
      acc[project.id] = acc[project.id] ? { ...acc[project.id], ...project } : project;
      return acc;
    }, {}),
  );

  $: values = {
    totalDonations: `$${totalDonations.toLocaleString()}`,
    dealsCount: pipelineDeals.length,
    lastUpdated,
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
      md:mb-32
      xl:text-6xl xl:tracking-tight"
  >
    {$_("donate.page.title")}
  </h1>

  <div class="font-light prose prose-xl
    prose-headings:text-red-berry-900 
    dark:prose-headings:text-mine-shaft-200 
    dark:prose-invert prose-headings:font-medium 
    prose-p:text-pretty
    prose-ul:text-left
    prose-ul:max-w-2xl
    prose-ul:mx-auto
    prose-li:italic
    prose-li:text-[85%]
    prose-li:text-pretty
    prose-strong:font-semibold
    prose-strong:text-red-berry-900
    mx-auto 
    mb-16 
    max-w-6xl 
    text-center 
    dark:text-neutral-200 
    md:mb-32 
    md:text-xl">
    <SvelteMarkdown source={$_("donate.page.intro", { values })} />
  </div>
  <div class="mt-16 flex flex-wrap justify-center">
    {#each projects as project}
      <ProjectCard {project} href={`/donate/${project.slug.toLowerCase()}`} />
    {/each}
  </div>
</div>
