import { writable } from "svelte/store";
import { browser } from "$app/environment";

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

function createMetadata() {
  const { subscribe, set, update } = writable({
    title: "",
    author: "",
    description: "",
    keywords: "",
  });

  return {
    subscribe,
    setMetadata: (metadata) => set(metadata),
    reset: () =>
      set({
        title: "",
        author: "",
        description: "",
        keywords: "",
      }),
  };
}

export const metadata = createMetadata();
