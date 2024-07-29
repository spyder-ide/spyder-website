<script>
  import { browser } from '$app/environment';
  import { colourScheme } from '$lib/store';
  import { get } from 'svelte/store';

  import { Icon } from 'svelte-icons-pack';
  import { LuSun, LuMoon } from "svelte-icons-pack/lu";

  let darkMode = get(colourScheme) === 'dark';
  let switchString = "Switch to light / dark version"

  const switchMode = () => {
    darkMode = !darkMode;
    colourScheme.set(darkMode ? 'dark' : 'light');
  };

  if (browser) {
    const currentTheme = localStorage.getItem('colourScheme');
    if (currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      colourScheme.set('dark');
      darkMode = true;
    } else {
      colourScheme.set('light');
      darkMode = false;
    }
    // Subscribe to colourScheme changes
    colourScheme.subscribe(value => {
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
    id="colourScheme-switch"
  />
  <label class="relative cursor-pointer p-2" for="colourScheme-switch">
    <Icon src={darkMode ? LuMoon : LuSun} size={24} title={switchString} />
    <span class="sr-only">{switchString}</span>
  </label>
</div>
