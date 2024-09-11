<script>
  export let contributor;
  export let size = "medium";
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
        class="break-all"
        class:text-xl={size === "large"}
        class:text-base={size !== "large"}
      >
        {contributor.name || contributor.login}
      </a>
      {#if contributor.role}
        <p class="text-gray-600 text-sm">
          {contributor.role}
        </p>
      {/if}
    </div>
  {/if}
</div>
