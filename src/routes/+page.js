import { metadata } from "$lib/store";
import {
  siteUrl,
  title,
  subtitle,
  description,
  keywords,
  author,
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
