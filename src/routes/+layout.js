import { browser } from "$app/environment";
import { locale, waitLocale, getLocaleFromNavigator } from "svelte-i18n";
import { normalizeLocale } from "$lib/i18n";
import "$lib/i18n";

export const load = async () => {
  if (browser) {
    try {
      const savedLocale = localStorage.getItem('preferred-locale');
      let detectedLocale;

      if (savedLocale) {
        detectedLocale = savedLocale;
      } else {
        detectedLocale = getLocaleFromNavigator();
      }

      // Normalize the locale before setting it
      const normalizedLocale = normalizeLocale(detectedLocale);
      locale.set(normalizedLocale);

      // Save the normalized locale
      localStorage.setItem('preferred-locale', normalizedLocale);
    } catch (error) {
      console.warn('Error setting locale:', error);
      locale.set('en-US'); // Fallback to English
    }
  }

  await waitLocale();

  return {
    i18n: { ready: true }
  };
};
