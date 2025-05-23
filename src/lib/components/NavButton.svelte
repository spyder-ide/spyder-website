<script>
  import { page } from "$app/stores";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { Icon } from "svelte-icons-pack";
  import { BiChevronDown, BiSolidHeart } from "svelte-icons-pack/bi";

  const dispatch = createEventDispatcher();

  export let button;
  export let buttonText;
  export let href = "";
  export let supportIcon = false;
  export let dropDownIcon = !supportIcon;
  export let src = supportIcon ? BiSolidHeart : dropDownIcon ? BiChevronDown : null;
  export let iconClasses = ``;
  export let showTextOnMobile = false;

  let beatInterval;
  let windowWidth = 0;
  let mobile = false;
  
  $: isActive = href && $page?.url?.pathname.startsWith(href);
  $: className = `w-4 h-4 transition-transform duration-200 ${supportIcon ? `beat ${mobile ? 'fill-red-berry-900' : isActive ? 'fill-white' : 'fill-red-berry-900'}` : `-mr-2`} ${iconClasses}`;
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

<button 
  bind:this={button} 
  on:click={handleClick} 
  class="menu-item" 
  class:menu-button={!mobile}
  class:active={isActive}
>
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

<style lang="postcss">
  .menu-button {
    @apply 
      min-w-24 
      rounded-md 
      border 
      border-mine-shaft-200 
      bg-spring-wood-50 
      px-3 
      py-1.5 
      shadow-sm 
      hover:bg-spring-wood-100 
      focus:outline-none 
      focus:ring-1 
      focus:ring-red-berry-900 
      focus:ring-offset-0 
      dark:border-mine-shaft-500 
      dark:bg-mine-shaft-950 
      dark:hover:bg-mine-shaft-900;
  }
  .menu-item {
    @apply 
      flex 
      items-center 
      justify-center 
      gap-2 
      text-xs 
      font-medium 
      transition-colors 
      duration-200 
      text-mine-shaft-700 
      dark:text-neutral-300;
  }
  .active {
    @apply 
      md:bg-red-berry-900 
      md:text-white 
      md:border-red-berry-900 
      md:hover:bg-red-berry-800 
      md:dark:bg-red-berry-900 
      md:dark:text-white 
      md:dark:border-red-berry-900 
      md:dark:hover:bg-red-berry-800
  }
</style>
