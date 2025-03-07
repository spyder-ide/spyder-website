<script>
  import { colourScheme } from "$lib/store";
  import { json, locale } from "svelte-i18n";

  import Button from "$lib/components/Button.svelte";
  import Chart from "$lib/components/Chart.svelte";
  import PaymentModal from "$lib/components/PaymentModal.svelte";
  import ProgressBar from "$lib/components/ProgressBar.svelte";

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

  // Chart.js data with reactive chartColors
  $: chartData = {
    labels: [project.monthly, project.oneTime],
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
    cutout: "40%",
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
  };
</script>

<div class="container mt-32">
  <div class="mx-auto max-w-6xl">
    <h1 class="w-full text-red-berry-900 text-5xl font-extralight md:text-7xl mb-8">
      {project.title}
    </h1>
    <div class="grid grid-cols-1 gap-16 md:grid-cols-5">
      <div class="md:col-span-3">
        <div class="image-container relative overflow-hidden rounded-2xl aspect-4/3">
          <img class="w-full h-full object-cover" src={project.image} alt={project.title} />
        </div>
      </div>
      <div class="text-lg font-light md:col-span-2">
        <strong class="text-6xl font-semibold">{project.donations.total.toLocaleString($locale, currencyOptions)}</strong><br />
        {project.collected}
        {#if project.donationGoal}
          {project.separator} <strong class="font-semibold">{project.donationGoal.toLocaleString($locale, currencyOptions)}</strong>
          <ProgressBar progress={project.donations.progress} />
        {:else}
          <hr class="my-8 border-4 border-neutral-300" />
        {/if}
        {#if project.donations}
          <div class="donations mt-12">
            <Chart {chartData} {chartOptions} {project} />
          </div>
        {/if}
        <div class="mt-12">
          <Button
            text={project.button.text}
            highlight={true}
            icon="donate"
            iconSize={24}
            textSize="md"
            fullwidth={true}
            isLink={false}
            on:click={() => showModal = true}
          />
        </div>
      </div>
      {#if project.content}
        <div class="md:col-span-3 mb-16 prose">
          <p class="text-lg font-light">{project.content}</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<PaymentModal
  bind:showModal
  donationLink={project.donationLink}
/>

