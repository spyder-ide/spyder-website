<script>
  import { _, json } from "svelte-i18n";
  import { onMount } from "svelte";

  import { browser } from "$app/environment";
  import { page } from "$app/stores";

  import { metadata } from "$lib/store";
  import { getOS } from "$lib/utils";
  import {
    ogImage as image,
    config,
    releases
   } from "$lib/config";

  import Loader from "$lib/components/Loader.svelte";
  import Button from "$lib/components/Button.svelte";
  import Metadata from "$lib/components/Metadata.svelte";

  /** @typedef {{ name: string, link: string }} ReleaseInfo */
  /** @typedef {Record<string, Record<string, ReleaseInfo>>} Releases */

  // State
  let arch = "unknown";
  let os = "unknown";
  let osName = "unknown";
  let macs = [];
  let downloadUrl = "";
  let osButtons = [];
  let result;

  // Page content
  let title, description, author, keywords;
  let pageTitle, pageSubtitle, pageSubtitleAlt;
  let download, buttonText;

  /**
   * Generate download buttons for all available releases
   * @param {Releases} releases - The releases configuration
   * @returns {Array<{highlight: boolean, icon: string, text: string, href: string}>}
   */
  const generateDownloadButtons = (releases) => {
    if (!releases) return [];

    const buttons = [];
    for (const [osType, architectures] of Object.entries(releases)) {
      for (const [_, releaseInfo] of Object.entries(architectures)) {
        if (releaseInfo) {
          buttons.push({
            highlight: true,
            icon: osType,
            text: releaseInfo.name,
            href: releaseInfo.link,
          });
        }
      }
    }
    return buttons;
  };

  /**
   * Extract OS and architecture from URL parameters
   * @returns {{ os: string, arch: string } | false}
   */
  const getOSfromURL = () => {
    if (!browser) return false;

    const params = new URLSearchParams(window.location.search);
    const os = params.get("os");
    const arch = params.get("arch");

    return (os && arch) ? { os, arch } : false;
  };

  /**
   * Initialize OS values and trigger automatic download if needed
   */
  const getOSValues = () => {
    if (!browser) return;

    result = getOSfromURL();

    // Detect OS and architecture
    if (!result) {
      os = getOS();
      arch = "x64";
    } else {
      ({ os, arch } = result);
    }

    // Set download info for non-Mac systems
    if (os !== "mac" && releases?.[os]?.[arch]) {
      osName = releases[os][arch].name;
      downloadUrl = releases[os][arch].link;
    }

    // Start automatic download if URL parameters are present
    if (downloadUrl && result) {
      window.location = downloadUrl;
    }
  };

  onMount(() => {
    getOSValues();
    osButtons = generateDownloadButtons(releases);
  });

  $: {
    // Update download info
    osName = releases?.[os]?.[arch]?.name ?? "";
    downloadUrl = releases?.[os]?.[arch]?.link ?? "";

    // Load translations
    buttonText = $_("download.button.message");
    title = $_("config.site.title");
    description = $_("config.site.description");
    author = $_("config.site.author");
    keywords = config.site.keywords;
    pageTitle = $_("download.title");
    pageSubtitle = $_("download.subtitle");
    pageSubtitleAlt = $_("download.alternative");
    download = $json("download.action");

    // Update metadata
    metadata.setMetadata({
      title: `${title} | ${download.name}`,
      description,
      keywords: keywords.join(", "),
      author,
      image,
      url: $page.url.href,
    });

    // Update Mac-specific data
    if (releases?.mac) {
      macs = Object.entries(releases.mac);
    }
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
      <div class="block mt-8 mb-16 text-center max-w-[250px] mx-auto">
        <Button
          href={downloadUrl}
          highlight
          icon={os}
          text="{buttonText} {osName}"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    {:else}
      <div class="mt-8 mb-16 text-center max-w-[550px] flex flex-col sm:flex-row gap-4 mx-auto">
        {#each macs as [_, release]}
          <Button
            highlight
            icon="mac"
            text="{buttonText} {release.name}"
            href={release.link}
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

  {#if osButtons?.length}
    <div class="mb-5 mx-auto grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-4">
      {#each osButtons as button}
        <Button {...button} />
      {/each}
    </div>
  {/if}
</div>
