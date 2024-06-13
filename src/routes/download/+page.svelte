<script>
  import { onMount } from "svelte";
  import Loader from "$lib/components/Loader.svelte";

  let os;
  let osName;
  let downloadStr;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    os = params.get("os") || "unknown";
    osName = os.charAt(0).toUpperCase() + os.slice(1);
    downloadStr = os === 'unknown' ? 'OS' : 'Download';
  });
</script>

{#if os && osName}
  <div class="download container max-w-[72ch] mt-32 text-center">
    <h1 class="text-4xl font-extralight">{osName} {downloadStr}</h1>
    {#if os === "linux"}
      <p>Here are the download instructions for Linux.</p>
    {:else if os === "windows"}
      <p>Here are the download instructions for Windows.</p>
    {:else if os === "mac"}
      <p>Here are the download instructions for Mac.</p>
    {:else}
      <p>OS not recognized. Please select your operating system.</p>
    {/if}
  </div>
{:else}
  <Loader/>
{/if}
