<script>
  import Button from "$lib/components/Button.svelte";
  import Loader from "$lib/components/Loader.svelte";

  export let project;
  export let href;

  $: progress = Math.min(project.donations.progress, 100);
</script>

<div class="w-full flex-shrink-0 py-4 md:w-1/2 md:px-4 xl:w-1/3">
  <div class="card">
    <div class="card-image relative">
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
      <h4 class="card-title pointer-events-none">
        {project.title}
      </h4>
    </div>
    <div class="card-container">
      {#if project.donations}
        <div class="donations text-lg font-light">
          {project.collected}: <span class="font-bold">${project.donations.total.toLocaleString()}</span>
          {#if project.donationGoal}
            of <span class="font-bold">${project.donationGoal.toLocaleString()}</span>
            <div class="progress-bar-container relative">
              <div class="progress-bar mt-2">
                <div class="progress" style="width: {progress}%" />
              </div>
              <div
                class="progress-bar-text"
                style="left: {progress < 5 ? '0' : `calc(${progress}% - 16px)`}"
              >
                {progress}%
              </div>
            </div>
          {/if}
        </div>
      {/if}
      {#if project.content}
        <div class="card-content">{project.content}</div>
      {/if}
      {#if project.button && href}
        <div class="button-container">
          <Button text={project.button.text} highlight={true} icon="donate" iconSize={32} fontSize={18} {href} />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .card {
    @apply grid h-full grid-cols-1 rounded-2xl border border-neutral-300 shadow-2xl dark:border-neutral-700 dark:shadow-neutral-900;
    grid-template-rows: auto 1fr;
  }

  .card-container {
    @apply grid grid-cols-1 gap-8 p-8;
    grid-template-rows: 1fr auto;
  }

  .card-title {
    @apply absolute bottom-0 left-0 z-10 w-full bg-white/70 p-6 text-5xl font-extralight text-red-berry-900 backdrop-blur-sm md:w-auto md:rounded-tr-2xl;
  }

  .card-image {
    @apply aspect-square w-full md:aspect-video;
  }

  .card-content {
    @apply font-light;
  }

  .progress-bar-container {
    @apply h-10 w-full overflow-hidden;
  }

  .progress-bar {
    @apply h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-spring-wood-200;
  }

  .progress-bar-text {
    @apply absolute left-0 top-6 w-8 text-center text-xs;
  }

  .progress {
    @apply h-full bg-red-berry-800 transition-all duration-500 dark:bg-red-berry-900;
  }

  .project-image {
    @apply absolute inset-0 aspect-square h-full w-full rounded-t-2xl object-cover md:aspect-video;
  }
</style>
