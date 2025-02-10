/**
 * @typedef {Object} ContentBlock
 * @property {string} id - Block identifier
 * @property {string} [title] - Block title
 * @property {Object} [content] - Block content
 * @property {string} [content.title] - Content title
 * @property {string} [content.text] - Content text
 * @property {Array<TabContent>} [tabs] - Block tabs
 * @property {string} [imgSrc] - Image source
 * @property {string} [imgAlt] - Image alt text
 * @property {boolean} [divider] - Show divider
 * @property {boolean} [columns] - Use columns layout
 * @property {boolean} [boxed] - Use boxed layout
 * @property {Object} [extraContent] - Additional content
 * @property {string} [extraContent.title] - Extra content title
 * @property {string} [extraContent.text] - Extra content text
 */

/**
 * @typedef {Object} TabContent
 * @property {string} [title] - Tab title
 * @property {boolean} [isVideo] - Whether the tab contains video content
 * @property {Object} content - Tab content
 * @property {string} [content.text] - Text content
 * @property {string} [content.videoCaption] - Video caption
 * @property {Array<{src: string}>} [content.videoSources] - Video sources
 * @property {string} [content.imgSrc] - Image source
 * @property {string} [content.imgAlt] - Image alt text
 */

/**
 * Options for deep merge operation
 * @typedef {Object} MergeOptions
 * @property {boolean} [arrayMode='replace'] - How to handle arrays: 'replace' | 'merge'
 * @property {boolean} [skipUndefined=true] - Whether to skip undefined values
 * @property {boolean} [skipNull=false] - Whether to skip null values
 * @property {Array<string>} [skipPaths=[]] - Paths to skip during merge (e.g., ['id', 'imgSrc'])
 */

/**
 * Deep merges two objects or arrays, with the second taking precedence
 * @template T
 * @param {T} target - The target object/array to merge into
 * @param {T} source - The source object/array to merge from
 * @param {MergeOptions} [options] - Merge options
 * @returns {T} The merged result
 */
function deepMerge(target, source, options = {}) {
  const {
    arrayMode = 'replace',
    skipUndefined = true,
    skipNull = false,
    skipPaths = []
  } = options;

  // Handle null/undefined cases
  if (!source) return target;
  if (!target) return source;

  // If either is not an object (including arrays), source takes precedence
  if (typeof target !== 'object' || typeof source !== 'object') {
    if ((skipUndefined && source === undefined) || (skipNull && source === null)) {
      return target;
    }
    return source;
  }

  // Handle arrays
  if (Array.isArray(target) && Array.isArray(source)) {
    if (arrayMode === 'replace') return source;
    return target.map((item, index) =>
      source[index] ? deepMerge(item, source[index], options) : item
    );
  }

  // Handle objects
  const merged = { ...target };
  for (const key in source) {
    // Skip specified paths
    if (skipPaths.includes(key)) continue;

    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];

      // Skip undefined/null values based on options
      if ((skipUndefined && sourceValue === undefined) ||
          (skipNull && sourceValue === null)) continue;

      if (sourceValue !== null && typeof sourceValue === 'object') {
        merged[key] = deepMerge(target[key], sourceValue, options);
      } else {
        merged[key] = sourceValue;
      }
    }
  }
  return merged;
}

/**
 * Merges configuration data with translations
 * @param {Array<ContentBlock>} configBlocks - Content blocks from config
 * @param {Array<ContentBlock>} translatedBlocks - Content blocks from translations
 * @param {MergeOptions} [options] - Merge options
 * @returns {Array<ContentBlock>} Merged content blocks
 */
export function mergeContentBlocks(configBlocks, translatedBlocks, options = {}) {
  if (!Array.isArray(configBlocks) || !Array.isArray(translatedBlocks)) {
    console.warn('Invalid content blocks provided');
    return [];
  }

  // Default options for content blocks
  const defaultOptions = {
    skipPaths: ['id', 'imgSrc', 'background', 'backgroundDark'],
    skipUndefined: true,
    skipNull: true,
    arrayMode: 'merge'
  };

  return configBlocks.map(configBlock => {
    const translatedBlock = translatedBlocks.find(block => block.id === configBlock.id) || {};
    return deepMerge(configBlock, translatedBlock, { ...defaultOptions, ...options });
  });
}

/**
 * Validates a content block against the expected schema
 * @param {ContentBlock} block - The content block to validate
 * @returns {{ valid: boolean, errors: string[] }} Validation result
 */
export function validateContentBlock(block) {
  const errors = [];

  if (!block.id) {
    errors.push('Content block must have an id');
  }

  if (block.tabs) {
    if (!Array.isArray(block.tabs)) {
      errors.push('Tabs must be an array');
    } else {
      block.tabs.forEach((tab, index) => {
        if (!tab.content) {
          errors.push(`Tab ${index} must have content`);
        }
        if (tab.isVideo && (!tab.content.videoSources || !Array.isArray(tab.content.videoSources))) {
          errors.push(`Video tab ${index} must have valid videoSources array`);
        }
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
