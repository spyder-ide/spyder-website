<script>
  import { onMount } from "svelte";
  import { config } from "$lib/config";

  import Button from "$lib/components/Button.svelte";
  import Loader from "$lib/components/Loader.svelte";

  let socials, socialIcons;

  onMount(() => {
    socials = config.site.socials;
    socialIcons = new Map(Object.entries(socials));
  });
</script>

{#if !socials}
  <Loader />
{:else}
  <div
    class="icon-bar mx-auto mt-4 mb-5 flex items-center justify-center gap-4"
  >
    {#each socialIcons as [icon, href]}
      <Button {icon} {href} button={false} target="_blank" iconSize={24} />
    {/each}
  </div>
{/if}
