import { init, register } from 'svelte-i18n';
import { browser } from '$app/environment';
import yaml from 'js-yaml';

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
        const data = yaml.load(content);

        if (!data) {
          console.warn(`Empty or invalid YAML content in ${path}`);
          continue;
        }

        const filename = path.split('/').pop().replace('.yaml', '');
        dictionary[filename] = data;
      } catch (error) {
        console.error(`Error loading translation file ${path}:`, error);
      }
    }

    if (Object.keys(dictionary).length === 0) {
      throw new Error('No valid translation files loaded');
    }

    return dictionary;
  } catch (error) {
    console.error('Error generating dictionary:', error);
    // Return a minimal dictionary to prevent complete failure
    return {
      config: {
        site: {
          title: 'Spyder IDE',
          description: 'The Scientific Python Development Environment',
          author: 'Spyder Project Contributors'
        }
      }
    };
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
    register(locale, () => ({
      config: {
        site: {
          title: 'Spyder IDE',
          description: 'The Scientific Python Development Environment',
          author: 'Spyder Project Contributors'
        }
      }
    }));
  }
};

/**
 * Available languages configuration
 * @type {Object.<string, Function>}
 */
const languages = {
  'en-US': () => import.meta.glob('./en-US/*.yaml', { query: '?raw', import: 'default' }),
  'es-ES': () => import.meta.glob('./es-ES/*.yaml', { query: '?raw', import: 'default' })
};

/**
 * Normalizes a locale string to a supported locale
 * @param {string} loc - The locale string to normalize
 * @returns {string} A supported locale ('en-US' or 'es-ES')
 */
export const normalizeLocale = (loc) => {
  if (loc.startsWith('en')) return 'en-US';
  if (loc.startsWith('es')) return 'es-ES';
  return 'en-US'; // fallback
};

// Register all languages
Object.entries(languages).forEach(([locale, getModules]) => {
  registerLanguage(locale, getModules);
});

// Initialize i18n with fallbacks
init({
  fallbackLocale: 'en-US',
  initialLocale: browser ? 'en-US' : undefined, // Start with English in browser
  loadingDelay: 200,
  formats: {}, // Add any custom formats here
  handleMissingMessage: ({ locale, id, defaultValue }) => {
    console.warn(`Missing translation: ${id} for locale: ${locale}`);
    return defaultValue || id;
  }
});
