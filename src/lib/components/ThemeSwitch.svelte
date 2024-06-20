<script>
  import { browser } from '$app/environment';
  import { theme } from '$lib/store';
  import { get } from 'svelte/store';

  import { Icon } from 'svelte-icons-pack';
  import { LuSun, LuMoon } from "svelte-icons-pack/lu";

  let darkMode = get(theme) === 'dark';
  let switchString = "Switch to light / dark version"

  const switchMode = () => {
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
    on:click={switchMode}
    checked={darkMode}
    class="sr-only"
    type="checkbox"
    id="theme-switch"
  />
  <label class="relative cursor-pointer p-2" for="theme-switch">
    <Icon src={darkMode ? LuMoon : LuSun} size={24} title={switchString} />
    <span class="sr-only">{switchString}</span>
  </label>
</div>
