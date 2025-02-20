import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { base } from "$app/paths";
import { getOS, getOSButtons } from "$lib/utils";

// Colour scheme
const storedColourScheme = browser
  ? localStorage.getItem("colourScheme") || "light"
  : "light";

export const colourScheme = writable(storedColourScheme);

if (browser) {
  colourScheme.subscribe((value) => {
    localStorage.setItem("colourScheme", value);
    console.log("Colour scheme set to", value);
  });
}

// Metadata
function createMetadata() {
  const initialMetadata = {
    title: "",
    description: "",
    keywords: "",
    author: "",
    url: "",
    image: "",
    site: ""
  };

  const { subscribe, set, update } = writable(initialMetadata);

  return {
    subscribe,
    setMetadata: (metadata) => {
      // Ensure all fields are strings to avoid SSR hydration issues
      const processedMetadata = Object.entries(metadata).reduce((acc, [key, value]) => {
        acc[key] = Array.isArray(value) ? value.join(", ") : String(value || "");
        return acc;
      }, {});

      set({ ...initialMetadata, ...processedMetadata });
    },
    reset: () => set(initialMetadata)
  };
}

export const metadata = createMetadata();

// Operating system
export const osStore = writable({ loading: true });

if (browser) {
  setTimeout(() => {
    const os = getOS();
    const osButtons = getOSButtons(base, os);
    osStore.set({ loading: false, os, osButtons });
  }, 0);
}
