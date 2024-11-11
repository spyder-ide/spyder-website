<script>
  import { metadata } from "$lib/store";
  import { page } from "$app/stores";
  import { title, description, keywords } from "$lib/config";

  import Metadata from "$lib/components/Metadata.svelte";
  import Button from "$lib/components/Button.svelte";

  export let data;
  const props = data.props;

  $: metadata.setMetadata({
    title: `${title} | ${props.page.title}`,
    description: description,
    keywords: keywords.join(", "),
    url: $page.url.href,
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
    {props.page.title}!
  </h1>
  <p
    class="text-center
      dark:text-neutral-200
      text-xl
      font-light
      max-w-6xl
      mx-auto
      mb-16
      md:mb-32"
  >
    {props.page.intro}
  </p>
  <div class="flex flex-wrap justify-center mt-16">
    {#each props.projects.content as project}
      <div class="flex-shrink-0 w-full md:w-1/2 xl:w-1/3 py-4 md:px-4">
        <div class="card">
          {#if project.image}
            <img
              class="w-full rounded-t-2xl"
              src={project.image}
              alt={project.title}
            />
          {/if}
          <div class="card-container">
            <h4 class="title">{project.title}</h4>
            <p class="content">{project.content}</p>
            {#if project.buttonText}
              <Button
                text={project.buttonText}
                highlight={true}
                icon="donate"
                iconSize={32}
                fontSize={18}
                href={project.href}
              />
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .card {
    @apply flex flex-col h-full border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-2xl dark:shadow-neutral-900;
  }

  .card-container {
    @apply p-8 grid grid-flow-row h-full;
    grid-template-rows: auto 1fr auto;
  }

  .card .title {
    @apply font-medium text-2xl text-red-berry-900 dark:text-neutral-400 mb-8;
  }

  .card .content {
    @apply font-light mb-8;
  }
</style>
