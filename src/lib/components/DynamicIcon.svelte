<script>
  import { Icon } from "svelte-icons-pack";

  import Loader from "./Loader.svelte";

  export let icon;
  export let iconTheme = "bs";
  export let size = "1.2rem";

  // We need to use the proper import structure for svelte-icons-pack
  // First import the whole theme, then access specific icons
  const themeImports = {
    ai: () => import("svelte-icons-pack/ai"),
    bs: () => import("svelte-icons-pack/bs"),
    bi: () => import("svelte-icons-pack/bi"),
    lu: () => import("svelte-icons-pack/lu"),
    vsc: () => import("svelte-icons-pack/vsc"),
    // Add others as needed
  };

  async function getIcon(iconName, iconTheme) {
    try {
      // Get the theme module loader
      const themeLoader = themeImports[iconTheme];
      if (!themeLoader) {
        console.warn(`Icon theme not configured: ${iconTheme}`);
        return null;
      }

      // Load the entire theme module
      const themeModule = await themeLoader();
      
      // Get the specific icon from the theme
      if (!(iconName in themeModule)) {
        console.warn(`Icon not found: ${iconName} in theme: ${iconTheme}`);
        return null;
      }
      
      return themeModule[iconName];
    } catch (error) {
      console.error(`Failed to load icon: ${iconName} from theme: ${iconTheme}`, error);
      return null;
    }
  }

  let iconPromise = getIcon(icon, iconTheme);
</script>

{#await iconPromise}
  <Loader />
{:then IconComponent}
  {#if IconComponent}
    <Icon src={IconComponent} {size} />
  {:else}
    <!-- Fallback for when the icon couldn't be loaded -->
    <small class="text-red-berry-900">Icon not found</small>
  {/if}
{:catch error}
  <small class="text-red-berry-900">Error loading icon: {error}</small>
{/await}
