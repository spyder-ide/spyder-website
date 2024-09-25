<script>
  import { Icon } from "svelte-icons-pack";
  import { BsInfoCircle } from "svelte-icons-pack/bs";

  import { tooltip } from "svooltip";
  import "svooltip/styles.css";

  export let contributor;
  export let size = "medium";

  // Function to generate HTML string from tooltip
  const generateTooltipHTML = (content) => {
    let htmlString = `<div class='flex flex-col gap-2'>`;
    content.forEach((item) => {
      htmlString += `<div><h3 class="text-[124%] text-red-berry-900">${item.title}</h3><ul class="list-disc list-inside">`;
      item.list.forEach((listItem) => {
        htmlString += `<li>${listItem}</li>`;
      });
      htmlString += "</ul></div>";
    });
    htmlString += "</div>";

    return htmlString;
  };

  let tooltipHTML, tooltipOptions;

  if (contributor.tooltip) {
    tooltipHTML = generateTooltipHTML(contributor.tooltip);
    tooltipOptions = {
      content: tooltipHTML,
      placement: "bottom",
      delay: [300, 300],
      offset: 15,
      html: true,
    };
  }
</script>

<div
  class="flex items-center"
  class:flex-col={size === "large"}
  class:gap-4={size === "large" || size === "medium"}
>
  <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">
    <img
      src={contributor.avatar_url}
      alt={contributor.login}
      class="rounded-full border border-neutral-300 dark:border-neutral-800"
      class:w-8={size === "small"}
      class:h-8={size === "small"}
      class:w-16={size === "medium"}
      class:h-16={size === "medium"}
      class:w-32={size === "large"}
      class:h-32={size === "large"}
    />
  </a>
  {#if size !== "small"}
    <div
      class:text-center={size === "large"}
      class:text-left={size !== "large"}
    >
      <a
        href={contributor.html_url}
        target="_blank"
        rel="noopener noreferrer"
        class:text-xl={size === "large"}
        class:text-base={size !== "large"}
      >
        {contributor.name || contributor.login}
      </a>
      {#if contributor.role}
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          {contributor.role}
          {#if contributor.tooltip}
            <button
              class="hover:text-red-berry-900 inline-flex align-middle ml-1"
              use:tooltip={tooltipOptions}
            >
              <Icon src={BsInfoCircle} size={14} />
            </button>
          {/if}
        </p>
      {/if}
    </div>
  {/if}
</div>

<style>
  :root {
    --svooltip-bg: #fff;
    --svooltip-text: rgb(55, 65, 81);
    --svooltip-padding: 1rem 1.2rem;
    --svooltip-text-size: 12px;
    --svooltip-shadow: 0 3px 7px rgb(0 0 0 / 0.25);
  }
</style>
