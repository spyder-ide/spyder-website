import { writable } from "svelte/store";
import { browser } from "$app/environment";

const storedTheme = browser
  ? localStorage.getItem("theme") || "light"
  : "light";

export const theme = writable(storedTheme);

if (browser) {
  theme.subscribe((value) => {
    localStorage.setItem("theme", value);
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
