import { init, register, getLocaleFromNavigator } from 'svelte-i18n';
import { browser } from '$app/environment';
import yaml from 'js-yaml';

// Generate dictionary
const generateDictionary = async (modules) => {
  const dictionary = {};

  for (const path in modules) {
    const content = await modules[path]();
    const data = yaml.load(content);
    const filename = path.split('/').pop().replace('.yaml', '');

    dictionary[filename] = data;
  }

  return dictionary;
}

// Register loaders for each language
register('en-US', async () => {
  const modules = import.meta.glob('./en-US/*.yaml', { query: '?raw', import: 'default' });
  return generateDictionary(modules);
});

register('es-ES', async () => {
  const modules = import.meta.glob('./es-ES/*.yaml', { query: '?raw', import: 'default' });
  return generateDictionary(modules);
});

// Initialize i18n
const fallbackLocale = 'en-US';

const getUserLocale = () => {
  if (browser) {
    let localLocale = getLocaleFromNavigator();
    if (localLocale.startsWith('en')) {
      localLocale = 'en-US';
    } else if (localLocale.startsWith('es')) {
      localLocale = 'es-ES';
    }
    return localLocale;
  }
  return fallbackLocale;
}

const initialLocale = getUserLocale();

init({
  fallbackLocale,
  initialLocale
});
