<script>
  import { locale } from "svelte-i18n";
  import { browser } from "$app/environment";

  import NavButton from "$lib/components/NavButton.svelte";

  export let languages;
  export let showTextOnMobile = true;

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
    {iconClasses}
    on:click={() => (isDropdownOpen = !isDropdownOpen)}
    {showTextOnMobile}
  />

  {#if isDropdownOpen}
    <div class="dropdownMenu">
      <div class="py-1" role="menu" aria-orientation="vertical">
        {#each languages as { code, name }}
          <button
            class="dropdownItem
                   {$locale === code ? 'bg-spring-wood-100 dark:bg-mine-shaft-900' : ''}"
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
    @apply absolute left-0 right-0 mt-1 min-w-24 transform rounded-md bg-spring-wood-50 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 dark:bg-mine-shaft-900;
  }

  .dropdownItem {
    @apply block w-full px-4 py-2 text-left text-xs text-mine-shaft-700 transition-colors duration-200 hover:bg-spring-wood-100 dark:text-neutral-300 dark:hover:bg-mine-shaft-900;
  }
</style>
