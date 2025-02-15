<script>
  import { locale } from "svelte-i18n";
  import { browser } from "$app/environment";

  import NavButton from "$lib/components/NavButton.svelte";

  export let languages;

  let isDropdownOpen = false;
  let dropdownButton;

  function handleSelect(selectedLocale) {
    isDropdownOpen = false;
    locale.set(selectedLocale);
    if (browser) {
      localStorage.setItem("preferred-locale", selectedLocale);
    }
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
  <NavButton
    bind:button={dropdownButton}
    buttonText={languages.find((lang) => lang.code === $locale)?.name || "English"}
    iconClasses={iconClasses}
    on:click={() => (isDropdownOpen = !isDropdownOpen)}
  />

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
