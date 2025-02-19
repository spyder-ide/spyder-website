<script>
  import { Icon } from "svelte-icons-pack";
  import { BiChevronDown, BiSolidHeart } from "svelte-icons-pack/bi";
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let button;
  export let buttonText;
  export let href;
  export let supportIcon = false;
  export let dropDownIcon = !supportIcon;
  export let src = supportIcon ? BiSolidHeart : dropDownIcon ? BiChevronDown : null;
  export let iconClasses = ``;
  export let showTextOnMobile = false;

  let beatInterval;
  let windowWidth = 0;
  let mobile = false;

  $: className = `w-4 h-4 transition-transform duration-200 ${supportIcon ? `beat fill-red-berry-900` : `-mr-2`} ${iconClasses}`;
  $: mobile = windowWidth < 768;

  let handleClick = (event) => {
    if (href) window.location.href = href;
    dispatch("click", event);
  };

  onMount(() => {
    windowWidth = window.innerWidth;
    const handleResize = () => (windowWidth = window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  onMount(() => {
    if (supportIcon) {
      beatInterval = setInterval(() => {
        const beatElements = button?.querySelectorAll(".beat") || [];
        beatElements.forEach((element) => {
          element.classList.remove("beat");
          setTimeout(() => element.classList.add("beat"), 1000);
        });
      }, 29000);
    }
  });

  onDestroy(() => {
    if (beatInterval) {
      clearInterval(beatInterval);
    }
  });
</script>

<button bind:this={button} on:click={handleClick} class="menu-item" class:menu-button={!mobile}>
  <span
    class="menu-button-text"
    class:hidden={mobile && !showTextOnMobile}
    class:uppercase={mobile && showTextOnMobile}
    class:tracking-wider={mobile && showTextOnMobile}
  >
    {buttonText}
  </span>
  {#if src}
    <Icon {src} {className} />
  {/if}
</button>

<style>
  .menu-button {
    @apply min-w-24 rounded-md border border-mine-shaft-200 bg-spring-wood-50 px-3 py-1.5 shadow-sm hover:bg-spring-wood-100 focus:outline-none focus:ring-1 focus:ring-red-berry-900 focus:ring-offset-0 dark:border-mine-shaft-500 dark:bg-mine-shaft-950 dark:hover:bg-mine-shaft-900;
  }
  .menu-item {
    @apply flex items-center justify-center gap-2 text-xs font-medium text-mine-shaft-700 transition-colors duration-200 dark:text-neutral-300;
  }
</style>
