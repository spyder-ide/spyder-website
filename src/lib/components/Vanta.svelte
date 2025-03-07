<script>
  import { browser } from "$app/environment";
  import { colourScheme } from "$lib/store";
  import { afterUpdate, onMount } from "svelte";

  let vantaInstance;
  let vantaContainer;
  let currentScheme;
  let scriptsLoaded = false;

  const threeSrc = "/assets/vendor/three.js/three.min.js";
  const vantaSrc = "/assets/vendor/vanta/vanta.dots.min.js";

  const getColor = (colors, colourScheme) => colors[colourScheme] || colors.light;

  const bgColors = {
    light: 0xf7f7f2,
    dark: 0x303030,
  };

  const fgColors = {
    light: 0x8c0000,
    dark: 0xa39b6c,
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

  const loadScript = async (src) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const loadScripts = async () => {
    if (browser && !scriptsLoaded) {
      try {
        await loadScript(threeSrc);
        await loadScript(vantaSrc);
        scriptsLoaded = true;
        console.log("Scripts loaded successfully");
        // Initialize Vanta once scripts are loaded
        initVanta();
      } catch (error) {
        console.error("Error loading scripts:", error);
      }
    }
  };

  const initVanta = () => {
    if (vantaContainer && browser && window.VANTA && scriptsLoaded) {
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
    } else if (!window.VANTA) {
      console.error("VANTA not available yet");
    } else {
      console.error("Cannot initialize Vanta");
    }
  };

  $: if (browser && vantaInstance && $colourScheme !== currentScheme && scriptsLoaded) {
    console.log("Color scheme changed, reinitializing Vanta");
    initVanta();
  }

  onMount(() => {
    if (browser) {
      loadScripts();
    }
  });

  afterUpdate(() => {
    if (browser && vantaInstance && $colourScheme !== currentScheme && scriptsLoaded) {
      console.log("After update: Color scheme changed, reinitializing Vanta");
      initVanta();
    }
  });
</script>

<div bind:this={vantaContainer} class="vanta-container absolute inset-0 -z-10"></div>
