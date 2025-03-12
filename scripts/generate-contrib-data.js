/**
 * GitHub Contributors Data Generator
 * 
 * This script fetches contributors data from GitHub API for the Spyder IDE repository
 * and saves it to a static JSON file for use in the website.
 */
import dotenv from "dotenv";
import { promises as fs } from "fs";
import path from "path";

// Load environment variables
dotenv.config();

// Configuration constants
const CONTRIBUTORS_API_URL = "https://api.github.com/repos/spyder-ide/spyder/contributors?per_page=100";
const OUTPUT_DIRECTORY = path.join(process.cwd(), "static", "data");
const OUTPUT_FILENAME = "github-contributors.json";
const DEFAULT_START_PAGE = 1;
const DEFAULT_MAX_PAGES = 3;

// GitHub token from environment variable
const githubToken = process.env.VITE_GITHUB_TOKEN;

/**
 * Checks if a given path exists.
 * @param {string} pathToCheck - Path to verify.
 * @returns {Promise<boolean>} - True if exists, false otherwise.
 */
const exists = async (pathToCheck) => {
  try {
    await fs.access(pathToCheck, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

/**
 * Fetches contributors data from GitHub API
 * 
 * @param {string} dataSrc - GitHub API URL for contributors
 * @param {string} token - GitHub authentication token
 * @param {number} startPage - Starting page number for pagination
 * @param {number} maxPages - Maximum number of pages to fetch
 * @returns {Promise<{contributors: Array<Object>, loading: boolean, error: string|null}>}
 */
export const getContributors = async (
  dataSrc = CONTRIBUTORS_API_URL,
  token = githubToken,
  startPage = DEFAULT_START_PAGE,
  maxPages = DEFAULT_MAX_PAGES
) => {
  let headers = null;
  let contributors = [];

  // Set up authorization headers if token is provided
  if (token) {
    headers = {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    };
  }

  try {
    // Validate data source
    if (!dataSrc) {
      throw new Error("No data source URL provided to fetch contributors");
    }

    // Validate token
    if (!headers) {
      throw new Error("GitHub token is required to fetch contributors data");
    }

    // Fetch contributors data with pagination
    for (let pageNum = startPage; pageNum <= maxPages; pageNum++) {
      const pageUrl = `${dataSrc}&page=${pageNum}`;
      const response = await fetch(pageUrl, { headers });
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }
      
      const pageData = await response.json();
      
      // Stop pagination if we received an empty page
      if (pageData.length === 0) {
        break;
      }
      
      contributors.push(...pageData);
    }

    return {
      contributors,
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch contributors:", error.message);
    return {
      contributors: [],
      loading: false,
      error: error.message,
    };
  }
};

/**
 * Main function to generate and save contributors data
 * Fetches data from GitHub and writes it to a static JSON file
 * 
 * @returns {Promise<void>}
 */
const generateContributorsData = async () => {
  console.log("🔄 Fetching GitHub contributors data...");

  try {
    // Fetch contributors data
    const { contributors, error } = await getContributors();

    if (error) {
      throw new Error(`Failed to fetch contributors: ${error}`);
    }

    if (!contributors || contributors.length === 0) {
      throw new Error("No contributors data received");
    }

    // Ensure the output directory exists
    if (!(await exists(OUTPUT_DIRECTORY))) {
      await fs.mkdir(OUTPUT_DIRECTORY, { recursive: true });
      console.log(`📁 Created output directory: ${OUTPUT_DIRECTORY}`);
    }

    // Generate the full output path
    const outputPath = path.join(OUTPUT_DIRECTORY, OUTPUT_FILENAME);

    // Write the contributors data to JSON file
    await fs.writeFile(outputPath, JSON.stringify(contributors, null, 2));

    console.log(`✅ Contributors data successfully saved to: ${outputPath}`);
    console.log(`📊 Total contributors: ${contributors.length}`);
  } catch (error) {
    console.error("❌ Error generating contributors data:", error.message);
    process.exit(1);
  }
};

// Execute the main function when this script is run directly
generateContributorsData();
