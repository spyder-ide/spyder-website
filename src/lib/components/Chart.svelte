<script>
  import { Doughnut } from "svelte-chartjs";
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";
  import { Icon } from "svelte-icons-pack";
  import { BsPersonFill } from "svelte-icons-pack/bs";
  import { BsCalendar } from "svelte-icons-pack/bs";
  import { BsCash } from "svelte-icons-pack/bs";
  import { _, locale } from "svelte-i18n";

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

  export let chartData;
  export let chartOptions;
  export let project;

  // Currency options
  const currencyOptions = { style: "currency", currency: "USD", maximumFractionDigits: 0 };

  // Generate supporter icons
  $: deals = project.donations?.deals.length;
</script>

<div class="grid w-full grid-cols-5 justify-center gap-8">
  <div class="pie-chart-container col-span-2">
    <Doughnut data={chartData} options={chartOptions} />
  </div>
  <div class="supporters-container col-span-3">
    <div class="flex h-full flex-col justify-center mt-1 gap-1 text-xs">
      <div class="flex items-center">
        <Icon src={BsCalendar} className="mr-2" size="2em" />
        <span>{$_("donate.page.monthly")}: {project.donations.monthly.toLocaleString($locale, currencyOptions)}</span>
      </div>
      <div class="flex items-center">
        <Icon src={BsCash} className="mr-2" size="2em" />
        <span>{$_("donate.page.oneTime")}: {project.donations.oneTime.toLocaleString($locale, currencyOptions)}</span>
      </div>
      <div>
        <div class="flex items-center gap-1">
          {#each Array(deals) as _, i}
            <Icon src={BsPersonFill} size="1.2em" />
          {/each}
        </div>
        <p class="mt-2 text-sm font-light">
          {$_("donate.page.supporters")}: {deals}
        </p>
      </div>
    </div>
  </div>
</div>
