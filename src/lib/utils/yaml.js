import yaml from "js-yaml";

/**
 * Safely loads and validates YAML content
 * @param {string} content - Raw YAML content to parse
 * @param {string} name - Name of the config for error messages
 * @returns {object} Parsed YAML content
 * @throws {Error} If YAML parsing fails or content is invalid
 */
export function loadYamlSafely(content, name) {
  try {
    const data = yaml.load(content, {
      json: true, // Forces JSON compatible output
      schema: yaml.JSON_SCHEMA, // Restricts to JSON-like types only
    });

    if (!data || typeof data !== "object") {
      throw new Error(`Invalid ${name} format: must be an object`);
    }

    return data;
  } catch (error) {
    console.error(`Error loading ${name}:`, error);
    throw new Error(`Failed to load ${name}: ${error.message}`);
  }
}
