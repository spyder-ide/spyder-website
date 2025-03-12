import fs from 'fs/promises';
import path from 'path';

const dataURL = "https://api.github.com/repos/spyder-ide/spyder/contributors?per_page=100";
// Use environment variable for GitHub token
const githubToken = import.meta.env.VITE_GITHUB_TOKEN;

export const getContributors = async (
  dataSrc = dataURL || "",
  token = githubToken || undefined,
  startPage = 1,
  maxPages = 3
) => {
  let headers, response;
  let contributors = [];

  if (token) {
    headers = {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    };
  }

  try {
    // Fetch the contributors data with authentication
    for (let n = startPage; n <= maxPages; n++) {
      if (!dataSrc) throw new Error(`There is no data source to fetch!`);
      if (headers) {
        response = await fetch(`${dataSrc}&page=${n}`, {
          headers,
        });
      } else {
        throw new Error(`GitHub token is required to fetch contributors data!`);
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      contributors.push(...data);
    }

    return {
      contributors,
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch contributors:", error);
    return {
      contributors: [],
      error: error.message,
    };
  }
};

// Main function to generate the contributors data file
const generateContributorsData = async () => {
  try {
    console.log('Fetching GitHub contributors data...');
    
    const { contributors, error } = await getContributors();
    
    if (error) {
      throw new Error(`Failed to fetch contributors: ${error}`);
    }
    
    // Ensure the directory exists
    const outputDir = path.resolve('./static/data');
    try {
      await fs.mkdir(outputDir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }
    
    // Write the data to the JSON file
    const outputPath = path.join(outputDir, 'github-contributors.json');
    await fs.writeFile(
      outputPath, 
      JSON.stringify({ contributors }, null, 2)
    );
    
    console.log(`Successfully wrote contributors data to ${outputPath}`);
    console.log(`Total contributors: ${contributors.length}`);
  } catch (error) {
    console.error('Error generating contributors data:', error);
    process.exit(1);
  }
};

generateContributorsData();
