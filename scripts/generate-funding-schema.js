// Generate the funding schema from the src/lib/config/data/funding.yaml file and save it to the funding.json file in the project root

import Ajv from "ajv";
import { promises as fs } from "fs";
import yaml from "js-yaml";
import path from "path";
import { exists } from "./utils.js";

const FUNDING_SCHEMA_URL = "https://fundingjson.org/schema/v1.1.0.json";

/**
 * Fetch the funding.json schema from the official URL
 */
async function fetchFundingSchema() {
  try {
    console.log("Fetching funding.json schema...");
    const response = await fetch(FUNDING_SCHEMA_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch schema: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching funding schema:", error);
    throw error;
  }
}

/**
 * JSON Schema validator
 */
async function validateFundingData(data, schema) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValid = validate(data);
  
  if (!isValid) {
    return validate.errors.map(error => `${error.instancePath} ${error.message}`);
  }
  
  return [];
}

/**
 * Load and parse the funding YAML file
 */
async function loadFundingYaml() {
  try {
    console.log("Loading funding.yaml file...");
    const yamlPath = path.join(process.cwd(), "src", "lib", "config", "data", "funding.yaml");
    
    if (!(await exists(yamlPath))) {
      throw new Error(`Funding YAML file not found at: ${yamlPath}`);
    }

    const yamlContent = await fs.readFile(yamlPath, 'utf8');
    const data = yaml.load(yamlContent);
    
    console.log("Successfully parsed funding.yaml");
    return data;
  } catch (error) {
    console.error("Error loading funding YAML:", error);
    throw error;
  }
}

/**
 * Main function to generate the funding.json file
 */
async function generateFundingSchema() {
  try {
    // Load the YAML data
    const fundingData = await loadFundingYaml();

    // Fetch and validate against schema
    const schema = await fetchFundingSchema();
    console.log("Validating funding data against schema...");
    
    const validationErrors = await validateFundingData(fundingData, schema);
    
    if (validationErrors.length > 0) {
      console.error("Schema validation failed:");
      validationErrors.forEach(error => console.error(`  🚩 ${error}`));
      throw new Error("Funding data does not comply with schema");
    }

    console.log("✅ Funding data is valid according to schema");

    // Ensure the output directory exists
    const outputDir = path.join(process.cwd(), "static");
    if (!(await exists(outputDir))) {
      await fs.mkdir(outputDir, { recursive: true });
    }

    // Write the JSON file
    const outputPath = path.join(outputDir, "funding.json");
    await fs.writeFile(outputPath, JSON.stringify(fundingData, null, 2));

    console.log("✅ Funding schema has been successfully generated and saved to:", outputPath);
  } catch (error) {
    console.error("Error generating funding schema:", error);
    process.exit(1);
  }
}

// Execute the script
generateFundingSchema();
