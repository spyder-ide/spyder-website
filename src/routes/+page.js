import { _, json } from "svelte-i18n"

import { metadata } from "$lib/store";
import {
  siteUrl,
  ogImage,
} from "$lib/config";

// Load content and process blocks
export function load() {
  // Set metadata for the home page
  metadata.setMetadata({
    title: `${_('config.site.title')} | ${_('config.site.subtitle')}`,
    description: _('config.site.description'),
    keywords: json('config.site.keywords').join(", "),
    author: _('config.site.author'),
    url: siteUrl,
    image: ogImage,
  });
}
