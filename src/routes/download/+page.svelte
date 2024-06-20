<script>
  import { onMount } from "svelte";
  import Loader from "$lib/components/Loader.svelte";
  import Button from "$lib/components/Button.svelte";

  import { releases } from "$lib/config";

  let os, osName, downloadUrl;
  let arch = "x86_64";

  let loadFunction = () => {
    const params = new URLSearchParams(window.location.search);
    os = params.get("os");
    if (!os || !releases[os]) {
      return;
    }
    osName = releases[os][arch].name;
    downloadUrl = releases[os][arch].link;

    // Start the download automatically on load
    if (downloadUrl) {
      window.location = downloadUrl;
    }
  };

  onMount(loadFunction);
</script>

<div class="download container max-w-[72ch] mt-32 text-center">
  {#if !os || !releases[os]}
    <h1 class="text-4xl font-extralight">
      Please select the package you want to download
    </h1>
  {:else if os !== "unknown"}
    <h1 class="text-4xl font-extralight mb-16">Download started&hellip;</h1>
    <h2 class="text-2xl font-light mb-4">
      Detected <span class="text-red-berry-900">{osName}</span> or compatible
    </h2>
    <p class="text-sm text-neutral-500">
      If the download does not start automatically, please click the button
      below
    </p>
    <div class="block my-6">
      <Button
        highlight
        text="Download for {osName}"
        icon={os}
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
      />
    </div>
    <p class="text-sm text-neutral-500">
      Alternatively, you can manually select the package you want from the link below
    </p>
  {:else}
    <Loader />
  {/if}
</div>
