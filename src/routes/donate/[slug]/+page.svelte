<script>
  import { _, json } from "svelte-i18n";
  import { onMount } from "svelte";
  import { metadata } from "$lib/store";
  import { page } from "$app/stores";
  import { ogImage } from "$lib/config";

  import Metadata from "$lib/components/Metadata.svelte";
  import Button from "$lib/components/Button.svelte";

  export let data;

  const { project, lastUpdated } = data;
  let showModal = false;
  let script;

  $: values = {
    totalDonations: `$${project.donations.total.toLocaleString()}`,
    lastUpdated: lastUpdated
      ? new Date(lastUpdated).toLocaleDateString()
      : null,
  };

  $: metadata.setMetadata({
    title: `${$_("config.site.title")} | ${project.title}`,
    description: project.content,
    url: $page.url.href,
    image: project.image || ogImage,
  });

  function toggleModal() {
    showModal = !showModal;
  }

  // Close modal with escape key
  function handleKeydown(event) {
    if (event.key === "Escape" && showModal) {
      toggleModal();
    }
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<svelte:head>
  {#if showModal}
    <style>
      main {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

<Metadata />

<div class="container mt-32">
  <div class="max-w-4xl mx-auto">
    <div class="project-header mb-16">
      <div class="image-container relative mb-8">
        <img
          class="w-full rounded-2xl aspect-16/10 object-cover"
          src={project.image}
          alt={project.title}
        />
        <h1 class="title z-10 absolute bottom-8 left-8">
          {project.title}
        </h1>
      </div>

      {#if project.donations}
        <div class="donations mb-12">
          <p class="text-xl font-light">
            Current donations: ${project.donations.total.toLocaleString()}
            {#if project.donationGoal}
              of ${project.donationGoal.toLocaleString()}
              <div class="progress-bar mt-4">
                <div
                  class="progress"
                  style="width: {Math.min(project.donations.progress, 100)}%"
                />
              </div>
            {/if}
          </p>
          <div class="donation-breakdown mt-4">
            <p class="text-lg font-light">
              Monthly donations: ${project.donations.monthly.toLocaleString()}
            </p>
            <p class="text-lg font-light">
              One-time donations: ${project.donations.oneTime.toLocaleString()}
            </p>
            <p class="text-lg font-light">
              Total supporters: {project.donations.deals.length}
            </p>
          </div>
        </div>
      {/if}
    </div>

    {#if project.content}
      <div class="content mb-16">
        <p class="text-lg font-light">{project.content}</p>
      </div>
    {/if}

    <div class="text-center">
      <button
        type="button"
        class="px-6 py-3 text-lg font-medium text-white bg-red-berry-900 rounded-lg hover:bg-red-berry-800"
        on:click={toggleModal}
      >
        Donate Now
      </button>
    </div>
  </div>
</div>

{#if showModal}
  <button
    type="button"
    class="modal-backdrop"
    on:click={toggleModal}
    on:keydown={handleKeydown}
    aria-label="Close modal"
  />
  <div class="modal">
    <button class="close-button" on:click={toggleModal}>×</button>
    <div class="modal-content">
      <iframe
        title="HubSpot Payments"
        class="payments-iframe-container w-full h-full"
        src="https://app.hubspot.com/payments/Pjm6SyqYNb?referrer=PAYMENT_LINK_EMBED"
      ></iframe>
    </div>
  </div>
{/if}

<style>
  .title {
    @apply font-medium text-6xl text-red-berry-900 bg-white/60 backdrop-blur-sm rounded-lg p-4;
  }

  .progress-bar {
    @apply w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-spring-wood-200;
  }

  .progress {
    @apply h-full bg-red-berry-800 dark:bg-red-berry-900 transition-all duration-500;
  }

  .modal-backdrop {
    @apply fixed inset-0 bg-black backdrop-blur-lg bg-opacity-50 z-40;
  }

  .modal {
    @apply fixed inset-8 md:inset-20 lg:inset-40 bg-white rounded-2xl z-50
           flex flex-col overflow-hidden;
  }

  .close-button {
    @apply absolute top-1 right-4 text-4xl text-neutral-500 hover:text-neutral-700
           dark:text-neutral-400 dark:hover:text-neutral-200 z-10;
  }

  .modal-content {
    @apply flex-1 overflow-hidden;
  }
</style>
