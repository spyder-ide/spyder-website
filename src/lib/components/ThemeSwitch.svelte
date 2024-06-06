<script>
  import { browser } from '$app/environment';
  import { Sun, Moon } from 'lucide-svelte';
  import { theme } from '$lib/store';
  import { get } from 'svelte/store';

  let darkMode = get(theme) === 'dark';

  const handleSwitchMode = () => {
    darkMode = !darkMode;
    theme.set(darkMode ? 'dark' : 'light');
  };

  if (browser) {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      theme.set('dark');
      darkMode = true;
    } else {
      theme.set('light');
      darkMode = false;
    }
    // Subscribe to theme changes
    theme.subscribe(value => {
      if (value === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      darkMode = value === 'dark';
    });
  }

</script>

<div class="inline-flex justify-center items-center">
  <input
    on:click={handleSwitchMode}
    checked={darkMode}
    class="sr-only"
    type="checkbox"
    id="theme-switch"
  />
  <label class="relative cursor-pointer p-2" for="theme-switch">
    <Sun class="hidden dark:block" size=16 />
    <Moon class="dark:hidden" size=16 />
    <span class="sr-only">Switch to light / dark version</span>
  </label>
</div>
