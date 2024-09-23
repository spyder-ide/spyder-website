<script>
  import { Icon } from "svelte-icons-pack";
  import { BsInfoCircle } from "svelte-icons-pack/bs";

  import { tooltip } from "svooltip";
  import "svooltip/styles.css";

  export let contributor;
  export let size = "medium";
  export let tooltipOptions = {
    content: contributor.tooltip,
    placement: "bottom",
    delay: [300, 300],
    offset: 15,
    html: true
  };
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
