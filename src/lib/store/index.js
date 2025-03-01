import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { base } from "$app/paths";
import { getOS, getOSButtons } from "$lib/utils";

// Color scheme store
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

export const osStore = writable({ loading: true });

if (browser) {
  setTimeout(() => {
    const os = getOS();
    const osButtons = getOSButtons(base, os);
    osStore.set({ loading: false, os, osButtons });
  }, 0);
}
