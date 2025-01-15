<script>
  import { _, json } from "svelte-i18n";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { releases } from "$lib/config";
  import { page } from "$app/stores";
  import { metadata } from "$lib/store";
  import { getOS } from "$lib/utils";

  import Loader from "$lib/components/Loader.svelte";
  import Button from "$lib/components/Button.svelte";
  import Metadata from "$lib/components/Metadata.svelte";

  import {
    title,
    author,
    description,
    ogImage as image,
    keywords,
  } from "$lib/config";

  let arch = "unknown";
  let os = "unknown";
  let osName = "unknown";
  let macs = Object.entries(releases.mac);
  let downloadUrl = "";
  let osButtons = [];
  let pageTitle, pageSubtitle, pageSubtitleAlt, download, result, buttonText;

  // Generate download buttons even if we don't have
  // a download parameter in the URL
  let generateDownloadButtons = (releases) => {
    for (let os in releases) {
      for (let arch in releases[os]) {
        if (releases[os][arch]) {
          osName = releases[os][arch].name;
          downloadUrl = releases[os][arch].link;
          osButtons.push({
            highlight: true,
            icon: os,
            text: osName,
            href: downloadUrl,
          });
        }
      }
    }

    return osButtons;
  };

  // Get the OS and architecture from the URL
  const getOSfromURL = () => {
    let os, arch;
    const params = new URLSearchParams(window.location.search);
    os = params.get("os");
    arch = params.get("arch");
    if (!os || !arch) {
      return false;
    }
    return { os, arch };
  };

  // and start the download automatically on load
  // if the URL contains a download parameter
  let getOSValues = () => {
    if (!browser) {
      return;
    }

    result = getOSfromURL();

    // Detect OS and architecture if not provided in the URL
    if (!result) {
      os = getOS();
      arch = "x64";
    } else {
      os = result.os;
      arch = result.arch;
    }

    if (os !== "mac" && releases[os][arch]) {
      osName = releases[os][arch].name;
      downloadUrl = releases[os][arch].link;
    }

    if (downloadUrl && result) {
      window.location = downloadUrl;
    }
  };

  onMount(() => {
    getOSValues();
    osButtons = generateDownloadButtons(releases);
  });

  $: {
    osName = releases[os]?.[arch]?.name ?? "";
    downloadUrl = releases[os]?.[arch]?.link ?? "";
    pageTitle = $_("download.title");
    pageSubtitle = $_("download.subtitle");
    pageSubtitleAlt = $_("download.alternative");
    buttonText = $_("download.button.text");
    download = $json("download.action");

    metadata.setMetadata({
      title: `${title} | ${$_("download.action.name")}`,
      description,
      keywords: keywords.join(", "),
      author,
      image,
      url: $page.url.href,
    });
  }
</script>

<Metadata />

<div class="download container max-w-2xl">
  {#if os !== "unknown"}
    <h1
      class="text-4xl
        lg:tracking-tight
        lg:text-6xl
        text-center
        tracking-tight
        font-extralight
        text-mine-shaft-600
        dark:text-mine-shaft-200 my-16 md:my-32"
    >
      {@html result ? download.title : pageTitle}
    </h1>
    <h2 class="text-center dark:text-neutral-200 text-4xl font-extralight mb-8">
      <span class="text-red-berry-900 dark:text-white font-extrabold">
        {osName}
      </span>
      {$_("download.detected")}
    </h2>
    <p class="text-center text-xl font-light">
      {@html result ? pageSubtitle : pageSubtitleAlt}
    </p>
    {#if os !== "mac"}
      <div class="block mt-8 mb-16 text-center w-[250px] mx-auto">
        <Button
          highlight
          text="{buttonText} {osName}"
          icon={os}
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    {:else}
      <div class="mt-8 mb-16 text-center w-[550px] flex gap-4 mx-auto">
        {#each macs as mac}
          <Button
            highlight
            text="{buttonText} {mac[1].name}"
            icon={"mac"}
            href={mac[1].link}
            target="_blank"
            rel="noopener noreferrer"
          />
        {/each}
      </div>
    {/if}
    <p class="text-center text-lg font-light mb-8">
      {@html download.alternative}
    </p>
  {:else}
    <Loader />
  {/if}

  {#if osButtons}
    <div
      class="mb-5 mx-auto grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-4"
    >
      {#each osButtons as button}
        <Button
          highlight={button.highlight}
          icon={button.icon}
          text={button.text}
          href={button.href}
        />
      {/each}
    </div>
  {/if}
</div>
