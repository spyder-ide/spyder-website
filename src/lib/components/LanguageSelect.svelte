<script>
  import { locale } from "svelte-i18n";
  import { Icon } from "svelte-icons-pack";
  import { BiChevronDown } from "svelte-icons-pack/bi";

  import { browser } from "$app/environment";

  export let languages;

  let isDropdownOpen = false;
  let dropdownButton;

  function handleSelect(selectedLocale) {
    locale.set(selectedLocale);
    if (browser) {
      localStorage.setItem("preferred-locale", selectedLocale);
    }
    isDropdownOpen = false;
  }

  function handleClickOutside(event) {
    if (dropdownButton && !dropdownButton.contains(event.target)) {
      isDropdownOpen = false;
    }
  }

  // Set initial locale from localStorage if available
  if (browser) {
    const savedLocale = localStorage.getItem("preferred-locale");
    if (savedLocale) {
      locale.set(savedLocale);
    }
  }

  $: iconClasses = isDropdownOpen ? `rotate-180` : ``;
</script>

<svelte:window on:click={handleClickOutside} />

<div class="relative inline-block text-left">
  <button
    bind:this={dropdownButton}
    class="dropdownButton"
    on:click={() => (isDropdownOpen = !isDropdownOpen)}
  >
    {languages.find((lang) => lang.code === $locale)?.name || "English"}
    <Icon
      src={BiChevronDown}
      className="w-4 h-4 ml-2 -mr-1 transition-transform duration-200 {iconClasses}"
    />
  </button>

  {#if isDropdownOpen}
    <div class="dropdownMenu">
      <div class="py-1" role="menu" aria-orientation="vertical">
        {#each languages as { code, name }}
          <button
            class="dropdownItem
                   {$locale === code
              ? 'bg-spring-wood-100 dark:bg-mine-shaft-900'
              : ''}"
            role="menuitem"
            on:click={() => handleSelect(code)}
          >
            {name}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .dropdownButton {
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

  .dropdownMenu {
    @apply absolute
      right-0
      left-0
      mt-1
      min-w-24
      rounded-md
      shadow-lg
      bg-spring-wood-50
      dark:bg-mine-shaft-900
      ring-1
      ring-black
      ring-opacity-5
      transform
      transition-all
      duration-200;
  }

  .dropdownItem {
    @apply block
      w-full
      text-left
      px-4
      py-2
      text-xs
    text-mine-shaft-700
    dark:text-neutral-300
    hover:bg-spring-wood-100
    dark:hover:bg-mine-shaft-900
      transition-colors
      duration-200;
  }
</style>
