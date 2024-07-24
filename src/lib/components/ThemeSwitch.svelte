<script>
  import { browser } from "$app/environment";
  import { colourScheme } from "$lib/store";
  import { get } from "svelte/store";

  import { Icon } from "svelte-icons-pack";
  import { LuSun, LuMoon } from "svelte-icons-pack/lu";

  let darkMode = get(colourScheme) === "dark";
  let switchString = "Switch to light / dark version";

  const switchMode = () => {
    darkMode = !darkMode;
    colourScheme.set(darkMode ? "dark" : "light");
  };

  const getColourScheme = () =>
    document.documentElement.dataset.colourScheme ||
    localStorage.getItem("colourScheme");

  const setColourScheme = (colourScheme = getColourScheme()) => {
    document.documentElement.dataset.colourScheme = colourScheme;
    localStorage.setItem("colourScheme", colourScheme);
  };

  if (browser) {
    const currentTheme = getColourScheme();
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    if (currentTheme === "dark" || prefersDark.matches) {
      darkMode = true;
      setColourScheme("dark");
    } else {
      darkMode = false;
      setColourScheme("light");
    }

    // Subscribe to colourScheme changes
    colourScheme.subscribe((value) => {
      if (value === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
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
