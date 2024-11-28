import yaml from 'js-yaml';
import content from './content.yaml?raw';

const downloadPage = yaml.load(content);

export function load() {
  return downloadPage;
}
