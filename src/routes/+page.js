import yaml from 'js-yaml';

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

// Import YAML data
import content from './content.yaml?raw';

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

  // Parse the YAML content
  const frontPage = yaml.load(content);

  return frontPage;
}
