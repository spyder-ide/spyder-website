import { browser } from "$app/environment";
import { locale, waitLocale, getLocaleFromNavigator } from "svelte-i18n";
import "$lib/i18n";

export const load = async () => {
  if (browser) {
    const savedLocale = localStorage.getItem('preferred-locale');
    if (savedLocale) {
      locale.set(savedLocale);
    } else {
      locale.set(getLocaleFromNavigator());
    }
  }
  await waitLocale();

  return {
    i18n: { ready: true }
  };
};

export const prerender = true;
export const trailingSlash = "always";
