<script>
  import { Icon } from "svelte-icons-pack";
  import {
    BsFacebook,
    BsGithub,
    BsInstagram,
    BsMastodon,
    BsTwitterX,
    BsWindows,
    BsApple,
    BsQuestionCircleFill,
    BsDownload,
    BsRssFill,
  } from "svelte-icons-pack/bs";

  import { VscTerminalLinux } from "svelte-icons-pack/vsc";

  let icons = {
    facebook: BsFacebook,
    github: BsGithub,
    instagram: BsInstagram,
    mastodon: BsMastodon,
    twitter: BsTwitterX,
    windows: BsWindows,
    linux: VscTerminalLinux,
    mac: BsApple,
    unknown: BsQuestionCircleFill,
    download: BsDownload,
    rss: BsRssFill,
  };

  export let button = true;
  export let highlight = false;
  export let icon = "";
  export let iconSize = 24;
  export let href = "";
  export let rel = "";
  export let text = "";
  export let title = text;
  export let target = "_parent";
  export let iconPosition = "right";
  export let fullwidth = false;
  export let textSize = "";

  let currentIcon = icons[icon];

  let hasIcon = icon !== "" && currentIcon !== undefined ? true : false;
  let iconLeft = hasIcon && iconPosition === "left" ? true : false;
  let iconRight = hasIcon && iconPosition === "right" ? true : false;

  if (textSize === 'xs') {
    iconSize = iconSize * 0.8
  } else if (textSize === 'sm') {
    iconSize = iconSize * 0.9
  } else if (textSize === 'lg') {
    iconSize = iconSize * 1.2
  } else if (textSize === 'xl') {
    iconSize = iconSize * 1.3
  }
</script>

<a
  {rel}
  {href}
  {title}
  {target}
  class:button
  class:w-full={fullwidth}
  class:icon-link={!button}
  class:hover:text-red-berry-950={!button}
  class:dark:hover:text-neutral-100={!button}
  class:highlight={button && highlight}
  class:py-4={button}
  class:px-5={button}
  class:rounded={button}
  class:regular={!highlight}
  class:text-xs={textSize === 'xs'}
  class:text-sm={textSize === 'sm'}
  class:text-md={textSize === 'md'}
  class:text-lg={textSize === 'lg'}
  class:text-xl={textSize === 'xl'}
  class="flex items-center justify-between gap-3 font-medium"
>
  {#if iconLeft}
    <span class:icon-left={iconPosition === "left"}>
      <Icon src={currentIcon} size={iconSize} />
    </span>
  {/if}

  {#if text}
    <span>{text}</span>
  {/if}

  {#if iconRight}
    <span class:icon-right={iconPosition === "right"}>
      <Icon src={currentIcon} size={iconSize} />
    </span>
  {/if}
</a>

<style>
  .button {
    @apply bg-gradient-to-b shadow-md min-h-12;
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
