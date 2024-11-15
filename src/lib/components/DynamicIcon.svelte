<script>
  import { Icon } from "svelte-icons-pack";
  import { getIcon } from "$lib/utils";

  import Loader from "./Loader.svelte";

  export let iconName;
  export let iconTheme = "bs";
  export let size = "1.2rem";

  let iconPromise = getIcon(iconName, iconTheme);
</script>

{#await iconPromise}
  <Loader />
{:then IconComponent}
  {#if IconComponent}
    <Icon src={IconComponent} {size} />
  {:else}
    <!-- Fallback for when the icon couldn't be loaded -->
    <small>Icon not found</small>
  {/if}
{:catch error}
  <small>Error loading icon: {error}</small>
{/await}
