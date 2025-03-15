<script>
  import { page } from "$app/stores";
  import { config, ogImage } from "$lib/config";
  import { colourScheme, metadata } from "$lib/store";
  import { colorSchemes } from "$lib/utils/tailwindColors";
  import { _, json, locale } from "svelte-i18n";
  
  import Button from "$lib/components/Button.svelte";
  import Chart from "$lib/components/Chart.svelte";
  import Metadata from "$lib/components/Metadata.svelte";
  import PaymentModal from "$lib/components/PaymentModal.svelte";
  import ProgressBar from "$lib/components/ProgressBar.svelte";
  
  import { Icon } from "svelte-icons-pack";
  import { BsChevronLeft } from "svelte-icons-pack/bs";
  import SvelteMarkdown from "svelte-markdown";

  export let data;

  let chartColors, chartOptions;

  // Get the base project data
  let { project } = data;

  // Modal state
  let showModal = false;

  // Currency options
  let currencyOptions = { style: "currency", currency: "USD", maximumFractionDigits: 0 };

  $: keywords = config.site?.keywords ?? [];

  // Merge with translations when they're available
  $: {
    const projectTranslations = $json("donate.projects")?.find((p) => p.id === project.id) || {};
    project = {
      ...project,
      ...projectTranslations,
    };
  }

  // Chart colors using pre-defined color schemes
  $: chartColors = colorSchemes.chart.quillGray;

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

  $: metadata.setMetadata({
    title: `${$_("config.site.title")} | ${$_("donate.page.title")}`,
    description: $_("config.site.description"),
    keywords: keywords.join(", "),
    url: $page.url.href,
    image: ogImage,
  });
</script>

<Metadata />

<div class="container mt-16 md:mt-32">
  <div class="mx-auto max-w-6xl">
    <a href="/donate" class="text-xs flex items-center gap-1 button py-1 text-red-berry-900">
      <Icon src={BsChevronLeft} />
      {$_("donate.page.back")}
    </a>
    <h1
      class="w-full text-5xl lg:text-6xl tracking-tight font-extralight text-mine-shaft-600 dark:text-mine-shaft-200 mb-8 md:mb-16"
    >
      {project.title}
    </h1>
    <div class="grid grid-cols-1 gap-8 md:gap-16 md:grid-cols-5">
      <div class="md:col-span-3">
        <div class="image-container relative overflow-hidden rounded-2xl aspect-4/3">
          <img class="w-full h-full object-cover" src={project.image} alt={project.title} />
        </div>
      </div>
      <div class="text-lg font-light md:col-span-2">
        {#if project.donations.total > 0}
          <strong class="text-6xl font-semibold text-mine-shaft-800 dark:text-mine-shaft-400">
            {project.donations.total.toLocaleString($locale, currencyOptions)}
          </strong>
          <br />
          {project.collected}
          {#if project.donationGoal}
            {project.separator}
            <strong class="font-semibold">{project.donationGoal.toLocaleString($locale, currencyOptions)}</strong>
            <ProgressBar progress={project.donations.progress} />
          {:else}
            <hr class="my-8 border-4 border-neutral-300" />
          {/if}
          {#if project.donations}
            <div class="md:block hidden mt-12">
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
              on:click={() => (showModal = true)}
            />
          </div>
        {/if}
      </div>
      {#if project.content}
        <div class="md:col-span-3 mb-16 prose prose-lg prose-headings:text-red-berry-900 dark:prose-headings:text-mine-shaft-200 dark:prose-invert prose-headings:font-medium prose-p:font-light prose-p:text-pretty prose-li:font-light">
          <SvelteMarkdown source={project.content} />
        </div>
      {/if}
    </div>
  </div>
</div>

<PaymentModal bind:showModal donationLink={project.donationLink} />
