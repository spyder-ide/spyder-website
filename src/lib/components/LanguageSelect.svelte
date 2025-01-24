<script>
  import { locale } from "svelte-i18n";
  import { browser } from "$app/environment";

  const languages = [
    { code: "en-US", name: "EN" },
    { code: "es-ES", name: "ES" },
  ];

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
</script>

<svelte:window on:click={handleClickOutside} />

<div class="relative inline-block text-left">
  <button
    bind:this={dropdownButton}
    class="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium
           bg-spring-wood-50 dark:bg-mine-shaft-950 border border-mine-shaft-200 dark:border-mine-shaft-800
           rounded-md shadow-sm focus:outline-none focus:ring-offset-0
           focus:ring-offset-spring-wood-50 dark:focus:ring-offset-mine-shaft-950 focus:ring-red-berry-900 focus:ring-1
           text-mine-shaft-700 dark:text-neutral-300 hover:bg-spring-wood-100 dark:hover:bg-mine-shaft-900
           transition-colors duration-200"
    on:click={() => (isDropdownOpen = !isDropdownOpen)}
  >
    {languages.find((lang) => lang.code === $locale)?.name || "EN"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-4 h-4 ml-1.5 transition-transform duration-200"
      class:rotate-180={isDropdownOpen}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </button>

  {#if isDropdownOpen}
    <div
      class="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg
             bg-spring-wood-50 dark:bg-mine-shaft-950 ring-1 ring-black ring-opacity-5
             transform transition-all duration-200"
    >
      <div class="py-1" role="menu" aria-orientation="vertical">
        {#each languages as { code, name }}
          <button
            class="block w-full text-left px-4 py-2 text-sm
                   text-mine-shaft-700 dark:text-neutral-300
                   hover:bg-spring-wood-100 dark:hover:bg-mine-shaft-900
                   transition-colors duration-200
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
