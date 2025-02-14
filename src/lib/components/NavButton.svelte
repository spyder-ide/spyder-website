<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { Icon } from "svelte-icons-pack";
  import { BiChevronDown, BiSolidHeart } from "svelte-icons-pack/bi";

  const dispatch = createEventDispatcher();

  export let button;
  export let buttonText;
  export let href;
  export let supportIcon = false;
  export let dropDownIcon = !supportIcon;
  export let src = supportIcon
    ? BiSolidHeart
    : dropDownIcon
      ? BiChevronDown
      : null;
  export let iconClasses = ``;
  $: className = `w-4 h-4 ml-2 transition-transform duration-200 ${supportIcon ? `beat fill-red-berry-900` : `-mr-2`} ${iconClasses}`;

  let beatInterval;

  let handleClick = (event) => {
    if (href) window.location.href = href;
    dispatch("click", event);
  };

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

<button bind:this={button} on:click={handleClick} class="menu-button">
  {buttonText}
  {#if src}
    <Icon {src} {className} />
  {/if}
</button>

<style>
  .menu-button {
    @apply inline-flex
      min-w-24
      items-center
      justify-center
      px-3
      py-1.5
      shadow-sm
      rounded-md
      text-xs
      font-medium
      text-mine-shaft-700
      dark:text-neutral-300
      bg-spring-wood-50
      dark:bg-mine-shaft-950
      border
      border-mine-shaft-200
      dark:border-mine-shaft-500
      hover:bg-spring-wood-100
      dark:hover:bg-mine-shaft-900
      focus:outline-none
      focus:ring-1
      focus:ring-red-berry-900
      focus:ring-offset-0
      transition-colors
      duration-200;
  }
</style>
