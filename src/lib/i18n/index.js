import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';
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
register('en', async () => {
  const modules = import.meta.glob('./en/*.yaml', { query: '?raw', import: 'default' });
  return generateDictionary(modules);
});

register('es', async () => {
  const modules = import.meta.glob('./es/*.yaml', { query: '?raw', import: 'default' });
  return generateDictionary(modules);
});

// Initialize i18n
init({
  fallbackLocale: 'en',
  initialLocale: browser ? window.navigator.language : 'en',
});
