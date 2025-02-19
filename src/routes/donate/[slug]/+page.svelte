<script>
  import { _, json, locale } from "svelte-i18n";
  import { metadata, colourScheme } from "$lib/store";
  import { page } from "$app/stores";
  import { ogImage } from "$lib/config";

  import Chart from "$lib/components/Chart.svelte";
  import Button from "$lib/components/Button.svelte";
  import Metadata from "$lib/components/Metadata.svelte";
  import ProgressBar from "$lib/components/ProgressBar.svelte";
  import PaymentModal from "$lib/components/PaymentModal.svelte";

  export let data;

  // chartColors for light/dark modes
  const chartColors = {
    light: ["rgba(43, 45, 66, 1)", "rgba(43, 45, 66, 0.6)"],
    dark: ["rgba(93, 93, 93, 1)", "rgba(93, 93, 93, 0.4)"],
  };

  // Get the base project data
  let { project } = data;

  // Modal state
  let showModal = false;

  // Currency options
  let currencyOptions = { style: "currency", currency: "USD", maximumFractionDigits: 0 };

  // Merge with translations when they're available
  $: {
    const projectTranslations = $json("donate.projects")?.find((p) => p.id === project.id) || {};
    project = {
      ...project,
      ...projectTranslations,
    };
  }

  $: metadata.setMetadata({
    title: `${$_("config.site.title")} | Support project ${project.title}`,
    description: project.content,
    url: $page.url.href,
    image: project.image || ogImage,
  });

  // Chart.js data with reactive chartColors
  $: chartData = {
    labels: ["Monthly", "One-time"],
    datasets: [
      {
        data: [project.donations?.monthly || 0, project.donations?.oneTime || 0],
        backgroundColor: $colourScheme === "dark" ? chartColors.dark : chartColors.light,
        borderWidth: 0,
      },
    ],
  };

  $: chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value.toLocaleString($locale, currencyOptions)} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "40%",
  };
</script>

<Metadata />

<div class="container mt-32">
  <div class="mx-auto max-w-6xl">
    <div class="project-header mb-16 flex flex-col gap-16 md:flex-row">
      <div class="image-container relative mb-8 max-w-3xl overflow-hidden rounded-2xl aspect-4/3">
        <img class="w-full h-full object-cover" src={project.image} alt={project.title} />
        <h1 class="title absolute bottom-0 left-0 z-10">
          {project.title}
        </h1>
      </div>
      <div class="text-lg font-light md:max-w-96">
        <strong class="text-7xl font-semibold">{project.donations.total.toLocaleString($locale, currencyOptions)}</strong><br />
        {project.collected}
        {#if project.donationGoal}
          {project.separator} <strong class="font-semibold">{project.donationGoal.toLocaleString($locale, currencyOptions)}</strong>
          <ProgressBar progress={project.donations.progress} />
        {:else}
          <hr class="my-8 border-4 border-neutral-300" />
        {/if}
        {#if project.donations}
          <div class="donations mt-16">
            <Chart {chartData} {chartOptions} {project} />
          </div>
        {/if}
      </div>
    </div>

    <div class="space-y-16 md:flex md:gap-24 md:space-y-0">
      <div class="md:w-2/3">
        {#if project.content}
          <div class="content mb-16">
            <p class="text-lg font-light">{project.content}</p>
          </div>
          <div class="flex justify-center md:justify-start">
            <Button
              text={project.button.text}
              highlight={true}
              icon="donate"
              iconSize={32}
              fontSize={18}
              isLink={false}
              on:click={() => showModal = true}
            />
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<PaymentModal
  bind:showModal
  donationLink={project.donationLink}
/>

<style>
  .title {
    @apply w-full bg-white/60 p-6 text-5xl font-extralight text-red-berry-900 backdrop-blur-sm md:w-auto md:rounded-tr-2xl md:text-7xl;
  }
</style>
