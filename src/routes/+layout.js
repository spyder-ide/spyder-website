import { browser } from '$app/environment';
import { locale, waitLocale } from 'svelte-i18n';
import '$lib/i18n';

export const load = async () => {
  if (browser) {
    locale.set(window.navigator.language);
  }
  await waitLocale();
};

export const prerender = true;
export const trailingSlash = "always";
