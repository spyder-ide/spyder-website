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
  <div class="grid grid-cols-3 gap-32 mt-16">
    {#each props.projects.content as project}
      <div class="card">
        {#if project.image}
          <img
            class="w-full rounded-t-2xl"
            src={project.image}
            alt={project.title}
          />
        {/if}
        <div class="p-8">
          <h4 class="title">{project.title}</h4>
          <p class="content">{project.content}</p>
          {#if project.buttonText}
            <Button
              text={project.buttonText}
              highlight={true}
              icon="donate"
              iconSize={32}
              fontSize={18}
            />
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .card {
    @apply border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-2xl dark:shadow-neutral-900;
  }

  .card .title {
    @apply font-medium text-2xl text-red-berry-900 dark:text-neutral-400 mb-8;
  }

  .card .content {
    @apply font-light mb-8;
  }
</style>
