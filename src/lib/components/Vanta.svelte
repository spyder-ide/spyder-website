<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { colourScheme } from "$lib/store";
  import { get } from "svelte/store";

  let vantaInstance;
  let vantaContainer;

  const getBackgroundColor = (colourScheme) =>
    colourSchemeColors[colourScheme] || colourSchemeColors.light;

  const colourSchemeColors = {
    light: 0xf7f7f2,
    dark: 0x303030,
  };

  const vantaOptions = {
    color: 0x8c0000,
    backgroundColor: getBackgroundColor(get(colourScheme)),
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
    if (vantaContainer && browser) {
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
      console.error("vantaContainer is not defined or the browser environment is not supported");
    }

    const unsubscribe = colourScheme.subscribe((currentColorScheme) => {
      if (vantaInstance) {
        vantaInstance.setOptions({
          backgroundColor: getBackgroundColor(currentColorScheme),
        });
      }
    });

    return () => {
      if (vantaInstance) vantaInstance.destroy();
      unsubscribe();
    };
  });
</script>

<svelte:head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.dots.min.js"></script>
</svelte:head>

<div bind:this={vantaContainer} class="vanta-container absolute inset-0 -z-10"></div>
