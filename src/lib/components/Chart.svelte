<script>
  import { ArcElement, CategoryScale, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
  import { Doughnut } from "svelte-chartjs";
  import { _, locale } from "svelte-i18n";
  import { Icon } from "svelte-icons-pack";
  import { BsCalendar, BsCash } from "svelte-icons-pack/bs";

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

  export let chartData;
  export let chartOptions;
  export let project;

  // Currency options
  const currencyOptions = { style: "currency", currency: "USD", maximumFractionDigits: 0 };
</script>

<div class="grid w-full grid-cols-5 justify-center gap-8">
  <div class="pie-chart-container col-span-2">
    <Doughnut data={chartData} options={chartOptions} />
  </div>
  <div class="supporters-container col-span-3">
    <div class="flex h-full flex-col justify-center mt-1 gap-1 text-sm">
      <div class="flex items-center">
        <Icon src={BsCalendar} className="mr-2" size="2em" />
        <span>{$_("donate.page.monthly")}: {project.donations.monthly.toLocaleString($locale, currencyOptions)}</span>
      </div>
      <div class="flex items-center">
        <Icon src={BsCash} className="mr-2" size="2em" />
        <span>{$_("donate.page.oneTime")}: {project.donations.oneTime.toLocaleString($locale, currencyOptions)}</span>
      </div>
    </div>
  </div>
</div>
