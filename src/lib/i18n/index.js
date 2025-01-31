import { init, register } from "svelte-i18n";
import { browser } from "$app/environment";
import { loadYamlSafely } from '$lib/utils/yaml';

/**
 * A minimal dictionary object containing basic site configuration
 * Used as a fallback when translation files cannot be loaded
 * @type {Object} Dictionary containing site configuration
 * @property {Object} config - Configuration object
 * @property {Object} config.site - Site-specific configuration
 * @property {string} config.site.title - The site title
 * @property {string} config.site.description - The site description
 * @property {string} config.site.author - The site author/contributors
 */
const MINIMAL_DICTIONARY = {
  config: {
    site: {
      title: 'Spyder IDE',
      description: 'The Scientific Python Development Environment',
      author: 'Spyder Project Contributors'
    }
  }
}

/**
 * Maps language codes to their normalized variants based on available languages
 * This helps map similar locales to our supported ones (e.g., 'en-GB' -> 'en-US')
 * @type {Object.<string, string>}
 */
const LANGUAGE_MAPPINGS = {
  // English variants
  "en": "en-US",
  "en-GB": "en-US",
  "en-AU": "en-US",
  "en-CA": "en-US",
  "en-NZ": "en-US",
  "en-ZA": "en-US",
  // Spanish variants
  "es": "es-ES",
  "es-MX": "es-ES",
  "es-AR": "es-ES",
  "es-CO": "es-ES",
  "es-CL": "es-ES",
  "es-PE": "es-ES",
  "es-VE": "es-ES",
  "es-419": "es-ES", // Latin American Spanish
};

/**
 * Configuration object for available languages in the application
 * @type {Object.<string, {
 *   name: string,
 *   loader: () => Object.<string, () => Promise<string>>
 * }>}
 */
export const availableLanguages = {
  "en-US": {
    name: "English",
    loader: () =>
      import.meta.glob("./en-US/*.yaml", { query: "?raw", import: "default" }),
  },
  "es-ES": {
    name: "Español",
    loader: () =>
      import.meta.glob("./es-ES/*.yaml", { query: "?raw", import: "default" }),
  },
};

// Convert availableLanguages to format needed for language selection
export const languageOptions = Object.entries(availableLanguages).map((
  [code, config],
) => ({
  code,
  name: config.name,
}));

// Use loaders from availableLanguages configuration
const languages = Object.fromEntries(
  Object.entries(availableLanguages).map((
    [locale, config],
  ) => [locale, config.loader]),
);

/**
 * Normalizes a locale string to a supported locale
 * @param {string} locale - The locale string to normalize
 * @returns {string} A supported locale from availableLanguages
 */
export const normalizeLocale = (locale = "en-US") => {
  // If the locale is already supported, return it
  if (availableLanguages[locale]) {
    return locale;
  }

  // Try to find a direct mapping
  const normalizedLocale = LANGUAGE_MAPPINGS[locale];
  if (normalizedLocale && availableLanguages[normalizedLocale]) {
    return normalizedLocale;
  }

  // Try to match just the language part (e.g., 'en' from 'en-GB')
  const languageCode = locale.split("-")[0];
  const mappedLanguage = LANGUAGE_MAPPINGS[languageCode];
  if (mappedLanguage && availableLanguages[mappedLanguage]) {
    return mappedLanguage;
  }

  // If no mapping found, return the default locale
  console.warn(`Unsupported locale: ${locale}, falling back to en-US`);
  return "en-US";
};

/**
 * Generates a dictionary of translations from YAML files
 * @param {Object.<string, Function>} modules - Object containing module paths and their loader functions
 * @returns {Promise<Object>} Dictionary of translations or fallback dictionary if loading fails
 * @throws {Error} When no valid translation files are loaded
 */
const generateDictionary = async (modules) => {
  try {
    const dictionary = {};

    for (const [path, loader] of Object.entries(modules)) {
      try {
        const content = await loader();
        const data = loadYamlSafely(content, 'content');

        if (!data) {
          console.warn(`Empty or invalid YAML content in ${path}`);
          continue;
        }

        const filename = path.split("/").pop().replace(".yaml", "");
        dictionary[filename] = data;
      } catch (error) {
        console.error(`Error loading translation file ${path}:`, error);
      }
    }

    if (Object.keys(dictionary).length === 0) {
      throw new Error("No valid translation files loaded");
    }

    return dictionary;
  } catch (error) {
    console.error("Error generating dictionary:", error);
    // Return a minimal dictionary to prevent complete failure
    return MINIMAL_DICTIONARY;
  }
};

/**
 * Registers a language loader for svelte-i18n
 * @param {string} locale - The locale identifier (e.g., 'en-US', 'es-ES')
 * @param {Function} getModules - Function that returns an object of module loaders
 * @returns {Promise<void>}
 */
const registerLanguage = async (locale, getModules) => {
  try {
    const modules = getModules();
    register(locale, async () => {
      const dict = await generateDictionary(modules);
      return dict;
    });
  } catch (error) {
    console.error(`Error registering ${locale}:`, error);
    // Register a minimal fallback dictionary
    register(locale, () => MINIMAL_DICTIONARY);
  }
};

/**
 * Register all available languages from the languages object
 * @description Iterates through each locale and its corresponding module loader function,
 * registering them with the i18n system
 */
Object.entries(languages).forEach(([locale, getModules]) => {
  registerLanguage(locale, getModules);
});

/**
 * Initialize the i18n system with configuration options
 * @description Sets up internationalization with the following settings:
 * - Fallback to en-US if a translation is missing
 * - Initial locale set to en-US in browser environments
 * - 200ms loading delay to prevent flashing
 * - Custom message handling for missing translations
 */
init({
  fallbackLocale: "en-US",
  initialLocale: browser ? "en-US" : undefined, // Start with English in browser
  loadingDelay: 200,
  formats: {}, // Add any custom formats here
  handleMissingMessage: ({ locale, id, defaultValue }) => {
    console.warn(`Missing translation: ${id} for locale: ${locale}`);
    return defaultValue || id;
  },
});
