<script>
  import { _, json } from "svelte-i18n";
  import { onMount } from "svelte";
  import { metadata } from "$lib/store";
  import { page } from "$app/stores";
  import { ogImage } from "$lib/config";
  import { Icon } from 'svelte-icons-pack';
  import { IoPersonOutline } from 'svelte-icons-pack/io';
  import { IoCalendarOutline } from 'svelte-icons-pack/io';
  import { IoCashOutline } from 'svelte-icons-pack/io';
  import { Doughnut } from 'svelte-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
  } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale
  );

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

  // Calculate percentages for pie chart
  $: monthlyPercentage = project.donations?.monthly
    ? (project.donations.monthly / project.donations.total) * 100
    : 0;
  $: oneTimePercentage = 100 - monthlyPercentage;

  // Generate supporter icons
  $: supporterIcons = project.donations?.deals.length > 10
    ? 10
    : project.donations?.deals.length;

  // Chart.js data
  $: chartData = {
    labels: ['Monthly', 'One-time'],
    datasets: [
      {
        data: [project.donations?.monthly || 0, project.donations?.oneTime || 0],
        backgroundColor: ['#991b1b', '#450a0a'],
        borderWidth: 0,
      },
    ],
  };

  $: chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `$${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '40%',
  };
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
      <div class="font-light text-xl">
        Current donations: <strong class="font-bold">${project.donations.total.toLocaleString()}</strong>
        {#if project.donationGoal}
          of <strong class="font-bold">${project.donationGoal.toLocaleString()}</strong>
          <div class="progress-bar mt-4">
            <div
              class="progress"
              style="width: {Math.min(project.donations.progress, 100)}%"
            />
          </div>
        {/if}
      </div>
    </div>

    <div class="md:flex md:gap-16">
      <div class="md:w-1/2">
        {#if project.content}
          <div class="content mb-8">
            <p class="text-lg font-light">{project.content}</p>
          </div>
          <button
            type="button"
            class="px-6 py-3 text-lg font-medium text-white bg-red-berry-900 rounded-lg hover:bg-red-berry-800"
            on:click={toggleModal}
          >
            Donate Now
          </button>
        {/if}
      </div>
      <div class="md:w-1/2 text-right">
        {#if project.donations}
          <div class="donations md:-mt-4">
            <div class="donation-breakdown space-y-8">
              <div class="pie-chart-container">
                <Doughnut
                  data={chartData}
                  options={chartOptions}
                />
                <div class="flex justify-between mt-4 text-sm">
                  <div class="flex items-center">
                    <Icon src={IoCalendarOutline} className="mr-2" size="1.2em" />
                    <span>Monthly: ${project.donations.monthly.toLocaleString()}</span>
                  </div>
                  <div class="flex items-center">
                    <Icon src={IoCashOutline} className="mr-2" size="1.2em" />
                    <span>One-time: ${project.donations.oneTime.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div class="supporters-container">
                <div class="flex items-center justify-center gap-1">
                  {#if project.donations.deals.length <= 10}
                    {#each Array(supporterIcons) as _, i}
                      <Icon src={IoPersonOutline} size="1.2em" />
                    {/each}
                  {:else}
                    <Icon src={IoPersonOutline} size="1.2em"/>
                    <span class="text-lg font-light">× {project.donations.deals.length}</span>
                  {/if}
                </div>
                <p class="text-sm font-light mt-2">
                  Total supporters: {project.donations.deals.length}
                </p>
              </div>
            </div>
          </div>
        {/if}
      </div>
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

  .pie-chart-container {
    @apply w-full max-w-64 mx-auto;
  }

  .supporters-container {
    @apply text-center;
  }
</style>
