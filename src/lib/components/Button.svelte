<script>
  import { Icon } from "svelte-icons-pack";
  import {
    BsFacebook,
    BsGithub,
    BsInstagram,
    BsMastodon,
    BsTwitterX,
    BsUbuntu,
    BsWindows,
    BsApple,
    BsQuestionCircleFill,
    BsDownload,
  } from "svelte-icons-pack/bs";

  let icons = {
    facebook: BsFacebook,
    github: BsGithub,
    instagram: BsInstagram,
    mastodon: BsMastodon,
    twitter: BsTwitterX,
    linux: BsUbuntu,
    windows: BsWindows,
    mac: BsApple,
    unknown: BsQuestionCircleFill,
    download: BsDownload,
  };

  export let button = true;
  export let highlight = false;
  export let icon = "";
  export let href = "";
  export let rel = "";
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
  {rel}
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
      <Icon src={currentIcon} size={20} />
    </span>
  {/if}

  {#if text}
    <span class="flex flex-shrink-0">{text}</span>
  {/if}

  {#if iconRight}
    <span class:icon-right={iconPosition === "right"} class="flex flex-shrink-0">
      <Icon src={currentIcon} size={20} />
    </span>
  {/if}
</a>

<style>
  .button {
    @apply bg-gradient-to-b shadow-md;
  }
  .button.highlight {
    @apply from-red-berry-900 to-red-berry-950 text-white border-red-berry-950;
  }

  .button.regular {
    @apply from-mine-shaft-50 to-mine-shaft-100 text-neutral-700 border border-mine-shaft-300;
  }

  .button .icon-right {
    margin-right: -0.4em;
  }

  .button .icon-left {
    margin-left: -0.4em;
  }
</style>
