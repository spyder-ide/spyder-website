<script>
  import { Doughnut } from "svelte-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
  } from "chart.js";

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

  export let totalContributors;
  export let percentageLatinos;
  export let percentageFemales;
  export let position = "bottom";

  $: chartData = {
    labels: ["Identifying as female", "Identifying as latino", "Other identities"],
    datasets: [
      {
        data: [
          percentageFemales,
          percentageLatinos,
          100 - percentageLatinos - percentageFemales,
        ],
        backgroundColor: ["#1b2a31", "#468794", "#94c4cc"],
      },
    ],
  };

  $: chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position,
      },
      title: {
        display: false,
        text: `Diversity in Our Core Contributors (Total: ${totalContributors})`,
      },
    },
  };
</script>

<Doughnut data={chartData} options={chartOptions} />
