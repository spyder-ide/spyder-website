import { browser } from "$app/environment";
import { base } from "$app/paths";
import { getOS, getOSButtons } from "$lib/utils";
import { writable } from "svelte/store";

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

// Metadata store for SEO and social sharing
const createMetadataStore = () => {
  const defaultMetadata = {
    title: "",
    description: "",
    keywords: "",
    url: "",
    image: ""
  };
  
  const { subscribe, set, update } = writable(defaultMetadata);
  
  return {
    subscribe,
    setMetadata: ({ title, description, keywords, url, image }) => {
      update(state => ({
        ...state,
        title,
        description,
        keywords,
        url,
        image
      }));
    },
    getMetadata: () => {
      let currentValue;
      subscribe(value => {
        currentValue = value;
      })();
      return currentValue;
    }
  };
};

export const metadata = createMetadataStore();

export const osStore = writable({ loading: true });

if (browser) {
  setTimeout(() => {
    const os = getOS();
    const osButtons = getOSButtons(base, os);
    osStore.set({ loading: false, os, osButtons });
  }, 0);
}
