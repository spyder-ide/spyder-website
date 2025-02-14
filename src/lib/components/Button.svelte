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
    download: BsDownload,
    facebook: BsFacebook,
    github: BsGithub,
    instagram: BsInstagram,
    linux: VscTerminalLinux,
    mac: BsApple,
    mastodon: BsMastodon,
    rss: BsRssFill,
    twitter: BsTwitterX,
    unknown: BsQuestionCircleFill,
    windows: BsWindows,
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

  let currentIcon = icons[icon] || null;
  let hasIcon = !!currentIcon && icon !== "";

  if (textSize === "xs") {
    iconSize *= 0.8;
  } else if (textSize === "sm") {
    iconSize *= 0.9;
  } else if (textSize === "lg") {
    iconSize *= 1.2;
  } else if (textSize === "xl") {
    iconSize *= 1.3;
  }
</script>

<a
  class:button={button}
  class:w-full={fullwidth}
  class:icon-link={!button}
  class:hover:text-red-berry-950={!button}
  class:dark:hover:text-neutral-100={!button}
  class:highlight={button && highlight}
  class:py-4={button}
  class:px-5={button}
  class:rounded={button}
  class:regular={!highlight}
  class:text-xs={textSize === "xs"}
  class:text-sm={textSize === "sm"}
  class:text-md={textSize === "md"}
  class:text-lg={textSize === "lg"}
  class:text-xl={textSize === "xl"}
  class="flex items-center justify-between gap-3 font-medium"
  {rel}
  {href}
  title={title}
  target={target}
>
  {#if hasIcon && iconPosition === "left"}
    <span class:icon-left={true}>
      <Icon src={currentIcon} size={iconSize} />
    </span>
  {/if}

  {#if text}
    <span class="text-left">{text}</span>
  {/if}

  {#if hasIcon && iconPosition === "right"}
    <span class:icon-right={true}>
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

  .button.highlight:hover {
    @apply from-red-berry-900 to-red-berry-900;
  }

  .button.regular {
    @apply from-mine-shaft-50 to-mine-shaft-100 text-neutral-700 border border-mine-shaft-300;
  }

  .button .icon-right {
    margin-right: -0.4em;
  }

  .icon-right {
    margin-left: -0.4em;
  }
</style>
