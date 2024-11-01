<script>
  import { metadata } from "$lib/store";
  import { page } from "$app/stores";
  import { title, description, keywords } from "$lib/config";

  import Metadata from "$lib/components/Metadata.svelte";
  import Button from "$lib/components/Button.svelte";

  const pageTitle = "Support Us";

  const introPage = `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
    Corrupti corporis quae unde cum, consectetur, voluptate placeat, aspernatur
    incidunt quaerat tempore molestiae. Reiciendis quod minima ex facilis
    molestiae quibusdam debitis aliquam.`;

  const buttonText = "Support This Project";

  const introProjects = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Laborum eaque deserunt recusandae odio voluptatibus corporis hic nemo sint
    nesciunt facilis eum, vel consectetur similique qui ea ab consequuntur ad
    fugiat. Laborum eaque deserunt recusandae odio voluptatibus corporis hic nemo
    sint nesciunt facilis eum, vel consectetur similique qui ea ab consequuntur
    ad fugiat.`;

  // Projects
  const projects = [
    {
      image: "https://picsum.photos/640/400",
      title: "Project 1",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti corporis quae unde cum, consectetur, voluptate placeat, aspernatur incidunt quaerat tempore molestiae. Reiciendis quod minima ex facilis molestiae quibusdam debitis aliquam.",
      buttonText,
    },
    {
      image: "https://picsum.photos/640/400",
      title: "Project 2",
      content:
        "Corrupti corporis quae unde cum, consectetur, voluptate placeat, aspernatur incidunt quaerat tempore molestiae. Reiciendis quod minima ex facilis molestiae quibusdam debitis aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      buttonText,
    },
    {
      image: "https://picsum.photos/640/400",
      title: "Project 3",
      content:
        "Reiciendis quod minima ex facilis molestiae quibusdam debitis aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti corporis quae unde cum, consectetur, voluptate placeat, aspernatur incidunt quaerat tempore molestiae.",
      buttonText,
    },
  ];

  $: metadata.setMetadata({
    title: `${title} | ${pageTitle}`,
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
    {pageTitle}!
  </h1>

  <p
    class="text-center dark:text-neutral-200 text-xl font-light max-w-6xl mx-auto mb-16 md:mb-32"
  >
    {introPage}
  </p>

  <Button
    text="Donate!"
    image="/assets/media/icon_donations.svg"
    highlight={true}
  />

  <h2
    class="text-4xl text-center text-red-berry-900 dark:text-neutral-400 mt-32 mb-16"
  >
    Projects
  </h2>
  <p
    class="text-center dark:text-neutral-200 font-light mb-24 mx-auto max-w-6xl text-xl"
  >
    {introProjects}
  </p>

  <div class="grid grid-cols-3 gap-32">
    {#each projects as project}
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
    @apply border rounded-2xl shadow-2xl;
  }

  .card .title {
    @apply font-medium text-2xl text-red-berry-900 mb-8;
  }

  .card .content {
    @apply font-light mb-8;
  }
</style>
