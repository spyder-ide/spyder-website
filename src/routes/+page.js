import { _, json } from "svelte-i18n"

import { metadata } from "$lib/store";
import {
  title,
  subtitle,
  description,
  keywords,
  author,
  siteUrl,
  ogImage,
} from "$lib/config";

// Load content and process blocks
export function load() {
  // Set metadata for the home page
  metadata.setMetadata({
    title: `${title} | ${subtitle}`,
    description,
    keywords: keywords.join(", "),
    author,
    url: siteUrl,
    image: ogImage,
  });
}
