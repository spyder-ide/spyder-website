<script>
  import { onMount } from "svelte";

  import { releases } from "$lib/config";

  import Loader from "$lib/components/Loader.svelte";
  import Button from "$lib/components/Button.svelte";

  let arch, os, osName, downloadUrl, osButtons;

  // Generate download buttons even if we don't have
  // a download parameter in the URL
  let generateDownloadButtons = (releases) => {
    const osButtons = [];
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
  // and start the download automatically on load
  // if the URL contains a download parameter
  let getOSValues = () => {
    const params = new URLSearchParams(window.location.search);

    if (!params) {
      return;
    }

    os = params.get("os");
    arch = params.get("arch");

    if (!os || !releases[os] || !releases[os][arch]) {
      return;
    }

    if (releases[os][arch]) {
      osName = releases[os][arch].name;
      downloadUrl = releases[os][arch].link;
    }

    if (downloadUrl) {
      window.location = downloadUrl;
    }
  };

  onMount(() => {
    getOSValues();
    osButtons = generateDownloadButtons(releases);
  });
</script>

<div class="download container max-w-2xl mt-32">
  {#if !os || !releases[os]}
    <h1 class="text-4xl font-extralight text-center">
      Please select the package you want from the links below
    </h1>
    <p class="text-sm text-neutral-500 text-center mt-4">
      Or visit our <a href="https://github.com/spyder-ide/spyder/releases"
        >releases page</a
      > on GitHub.
    </p>
  {:else if os !== "unknown"}
    <h1 class="text-center text-4xl font-extralight mb-16">
      Download started&hellip;
    </h1>
    <h2 class="text-center text-2xl font-light mb-4">
      Detected <span class="text-red-berry-900">{osName}</span> or compatible
    </h2>
    <p class="text-sm text-neutral-500 text-center">
      If the download does not start automatically, please click the button
      below
    </p>
    <div class="block my-6 text-center">
      <Button
        highlight
        text="Download for {osName}"
        icon={os}
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
      />
    </div>
    <p class="text-sm text-neutral-500 text-center">
      Alternatively, you can manually select the package you want from the links
      below, or visit our <a
        href="https://github.com/spyder-ide/spyder/releases"
        target="_blank">releases page</a
      > on GitHub.
    </p>
  {:else}
    <Loader />
  {/if}

  {#if osButtons}
    <div
      class="border-t border-t-mine-shaft-300 dark:border-t-mine-shaft-600 mt-8"
    >
      <div class="text-neutral-500 text-sm font-medium mt-4 text-center">
        Available for
      </div>
      <div
        class="mx-auto max-w-md mt-4 mb-5 grid grid-cols-1 xl:grid-cols-2 items-center justify-center gap-4"
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
    </div>
  {/if}
</div>
