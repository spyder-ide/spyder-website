import { writable } from 'svelte/store';
import type { PageMetadata } from '$lib/metadata/types';
import { createWebsiteMetadata } from '$lib/metadata/utils';

function createMetadataStore() {
  const { subscribe, set, update } = writable<PageMetadata>(createWebsiteMetadata({}));

  return {
    subscribe,

    /**
     * Set new metadata, merging with defaults where appropriate
     */
    set: (metadata: Partial<PageMetadata>) => {
      set(metadata as PageMetadata);
    },

    /**
     * Update existing metadata
     */
    update: (updater: (metadata: PageMetadata) => PageMetadata) => {
      update(updater);
    },

    /**
     * Reset metadata to default website metadata
     */
    reset: () => {
      set(createWebsiteMetadata({}));
    }
  };
}

export const metadata = createMetadataStore();
