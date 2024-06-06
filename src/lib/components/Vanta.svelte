<script>
  import { onMount } from "svelte";
  import { theme } from "$lib/store";
  import { get } from "svelte/store";

  let vantaInstance;
  let vantaContainer;

  const getBackgroundColor = (theme) => themeColors[theme] || themeColors.light;

  const themeColors = {
    light: 0xf7f7f2,
    dark: 0x303030,
  };

  const vantaOptions = {
    color: 0x8c0000,
    backgroundColor: getBackgroundColor(get(theme)),
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    showLines: false,
  };

  onMount(() => {
    if (vantaContainer) {
      try {
        vantaInstance = window.VANTA.DOTS({
          ...vantaOptions,
          el: vantaContainer,
        });
        console.log("Vanta initialized successfully");
      } catch (error) {
        console.error("Vanta initialization error:", error);

      }
    } else {
      console.error("vantaContainer is not defined");
    }

    const unsubscribe = theme.subscribe((currentTheme) => {
      if (vantaInstance) {
        vantaInstance.setOptions({
          backgroundColor: getBackgroundColor(currentTheme),
        });
      }
    });

    return () => {
      if (vantaInstance) vantaInstance.destroy();
      unsubscribe();
    };
  });
</script>

<div bind:this={vantaContainer} class="vanta-container"></div>

<style>
  .vanta-container {
    @apply absolute inset-0 -z-10
  }
</style>
