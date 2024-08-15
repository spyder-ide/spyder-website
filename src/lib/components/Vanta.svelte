<script>
  import { onMount, afterUpdate } from "svelte";
  import { browser } from "$app/environment";
  import { colourScheme } from "$lib/store";

  let vantaInstance;
  let vantaContainer;
  let currentScheme;

  const getColor = (colors, colourScheme) =>
    colors[colourScheme] || colors.light;

  const bgColors = {
    light: 0xf7f7f2,
    dark: 0x303030,
  };

  const fgColors = {
    light: 0x8c0000,
    dark: 0xf7f7f2,
  };

  $: vantaOptions = {
    color: getColor(fgColors, $colourScheme),
    backgroundColor: getColor(bgColors, $colourScheme),
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    showLines: false,
  };

  function initVanta() {
    if (vantaContainer && browser && window.VANTA) {
      if (vantaInstance) {
        vantaInstance.destroy();
      }
      try {
        vantaInstance = window.VANTA.DOTS({
          ...vantaOptions,
          el: vantaContainer,
        });
        currentScheme = $colourScheme;
        console.log("Vanta initialized successfully with scheme:", currentScheme);
      } catch (error) {
        console.error("Vanta initialization error:", error);
      }
    } else {
      console.error("Cannot initialize Vanta");
    }
  }

  $: if (browser && vantaInstance && $colourScheme !== currentScheme) {
    console.log("Color scheme changed, reinitializing Vanta");
    initVanta();
  }

  onMount(() => {
    if (browser) {
      initVanta();
    }
  });

  afterUpdate(() => {
    if (browser && vantaInstance && $colourScheme !== currentScheme) {
      console.log("After update: Color scheme changed, reinitializing Vanta");
      initVanta();
    }
  });
</script>

<div bind:this={vantaContainer} class="vanta-container absolute inset-0 -z-10"></div>
