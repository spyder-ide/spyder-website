<script>
  import { locale } from 'svelte-i18n';
  import { browser } from '$app/environment';

  const languages = [
    { code: 'en-US', name: 'EN' },
    { code: 'es-ES', name: 'ES' }
  ];

  function handleChange(event) {
    const selectedLocale = event.target.value;
    locale.set(selectedLocale);
    if (browser) {
      localStorage.setItem('preferred-locale', selectedLocale);
    }
  }

  // Set initial locale from localStorage if available
  if (browser) {
    const savedLocale = localStorage.getItem('preferred-locale');
    if (savedLocale) {
      locale.set(savedLocale);
    }
  }
</script>

<select
  class="bg-transparent border-none text-sm hover:opacity-60 cursor-pointer mt-[3px]"
  on:change={handleChange}
  value={$locale}
>
  {#each languages as { code, name }}
    <option value={code}>{name}</option>
  {/each}
</select>
