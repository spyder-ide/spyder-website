<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { releases } from "$lib/config";
  import { page } from "$app/stores";
  import { metadata } from "$lib/store";

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

  $: metadata.setMetadata({
    title: `${title} | Download`,
    description,
    keywords: keywords.join(", "),
    author,
    image,
    url: $page.url.href,
  });

  let arch = "unknown";
  let os = "unknown";
  let osName = "unknown";
  let downloadUrl = "";
  let osButtons = [];

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

    const result = getOSfromURL();

    if (!result) {
      return;
    }

    os = result.os;
    arch = result.arch;

    if (releases[os][arch]) {
      osName = releases[os][arch].name;
      downloadUrl = releases[os][arch].link;
    }

    if (downloadUrl) {
      window.location = downloadUrl;
    }
  };

  $: osName = releases[os]?.[arch]?.name ?? "";
  $: downloadUrl = releases[os]?.[arch]?.link ?? "";

  onMount(() => {
    getOSValues();
    osButtons = generateDownloadButtons(releases);
  });

  export let data;
  const pageTitle = data.props.title;
  const pageIntro = data.props.intro;
  const download = data.props.download;
</script>

<Metadata />

<div class="download container max-w-2xl">
  {#if os === "unknown"}
    <h1
      class="text-4xl
        xl:tracking-tight
        xl:text-6xl
        text-center
        tracking-tight
        font-extralight
        text-mine-shaft-600
        dark:text-mine-shaft-200 my-16 md:my-32"
    >
      {pageTitle}
    </h1>
    <h2
      class="text-center dark:text-neutral-200 text-xl font-light mb-4 max-w-6xl mx-auto"
    >
      {@html pageIntro}
    </h2>
  {:else if os !== "unknown"}
    <h1
      class="text-4xl
        xl:tracking-tight
        xl:text-6xl
        text-center
        tracking-tight
        font-extralight
        text-mine-shaft-600
        dark:text-mine-shaft-200 my-16 md:my-32"
    >
      {@html download.start}
    </h1>
    <h2 class="text-center dark:text-neutral-200 text-5xl font-extralight mb-8">
      <span class="text-red-berry-900 dark:text-white font-extrabold"
        >{osName}</span
      > selected
    </h2>
    <p class="text-center text-xl font-light">
      {download.click}
    </p>
    <div class="block mt-8 mb-16 text-center w-48 mx-auto">
      <Button
        highlight
        text="Download for {osName}"
        icon={os}
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
      />
    </div>
    <p class="text-center text-xl font-light">
      {@html download.alt}
    </p>
  {:else}
    <Loader />
  {/if}

  {#if osButtons}
    <div
      class="mt-8 mb-5 mx-auto max-w-48 sm:max-w-md grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-4"
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
