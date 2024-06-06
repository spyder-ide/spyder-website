<script>
  import { icons } from "./icons";

  export let button = true;
  export let highlight = false;
  export let icon = "";
  export let href = "";
  export let text = "";
  export let title = text;
  export let target = "_parent";
  export let iconPosition = "right";

  let currentIcon = icons[icon];

  let hasIcon = icon !== "" && currentIcon !== undefined ? true : false;
  let iconLeft = hasIcon && iconPosition === "left" ? true : false;
  let iconRight = hasIcon && iconPosition === "right" ? true : false;
</script>

<a
  {href}
  {target}
  {title}
  class:button
  class:icon-link={!button}
  class:hover:text-red-berry-950={!button}
  class:highlight={button && highlight}
  class:py-3={button}
  class:px-5={button}
  class:rounded={button}
  class:regular={!highlight}
  class="inline-flex items-center justify-center gap-3 text-sm"
>
  {#if iconLeft}
    <span class:icon-left={iconPosition === "left"} class="flex flex-shrink-0">
      {@html currentIcon}
    </span>
  {/if}

  {#if text}
    <span class="flex flex-shrink-0">{text}</span>
  {/if}

  {#if iconRight}
    <span class:icon-right={iconPosition === "right"} class="flex flex-shrink-0">
      {@html currentIcon}
    </span>
  {/if}
</a>

<style>
  .button.highlight {
    @apply bg-red-berry-900 text-white border-red-berry-950;
    &:hover {
      @apply bg-red-berry-800 border-red-berry-900;
    }
  }

  .button.regular {
    @apply bg-mine-shaft-100 text-neutral-700 border border-mine-shaft-300;
    &:hover {
      @apply bg-mine-shaft-50 text-neutral-500 border-mine-shaft-200;
    }
  }

  .button .icon-right {
    margin-right: -0.4em;
  }

  .button .icon-left {
    margin-left: -0.4em;
  }
</style>
