<script>
  import { Icon } from "svelte-icons-pack";

  import Loader from "./Loader.svelte";

  export let icon;
  export let iconTheme = "bs";
  export let size = "1.2rem";

  let iconThemes = {
    ai: () => import("svelte-icons-pack/ai"),
    bs: () => import("svelte-icons-pack/bs"),
    bi: () => import("svelte-icons-pack/bi"),
    ci: () => import("svelte-icons-pack/ci"),
    fi: () => import("svelte-icons-pack/fi"),
    fa: () => import("svelte-icons-pack/fa"),
    oi: () => import("svelte-icons-pack/oi"),
    hi: () => import("svelte-icons-pack/hi"),
    im: () => import("svelte-icons-pack/im"),
    io: () => import("svelte-icons-pack/io"),
    lu: () => import("svelte-icons-pack/lu"),
    ri: () => import("svelte-icons-pack/ri"),
    si: () => import("svelte-icons-pack/si"),
    sl: () => import("svelte-icons-pack/sl"),
    ti: () => import("svelte-icons-pack/ti"),
    tr: () => import("svelte-icons-pack/tr"),
    wi: () => import("svelte-icons-pack/wi"),
    vsc: () => import("svelte-icons-pack/vsc"),
  };

  async function getIcon(iconName, iconTheme) {
    try {
      const moduleLoader = iconThemes[iconTheme];
      if (!moduleLoader) {
        throw new Error(`Unknown icon theme: ${iconTheme}`);
      }
      const module = await moduleLoader();
      return module[iconName];
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
