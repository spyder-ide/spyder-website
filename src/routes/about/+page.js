/**
 * About page data loading
 * Loads metadata and pre-generated GitHub contributors data
 */
export const load = async ({ fetch }) => {
  // Page metadata
  const metadata = {
    title: "Spyder IDE | About",
    description:
      "Get the ease of use of Jupyter along with many advanced features found in PyCharm and VSCode in a single programming environment",
    keywords:
      "Spyder IDE, Python IDE, Python, IDE, Spyder, Spyder IDE, Spyder IDE.org",
    author: "Spyder IDE",
    image: "https://spyder-ide.org/assets/media/website_screenshot.png",
    url: "/about",
    prism: false,
  };

  try {
    // Fetch the pre-generated contributors data from static JSON file
    const response = await fetch("/data/github-contributors.json");
    
    if (!response.ok) {
      // Create a more helpful error message based on the status code
      let errorMessage = `Failed to load contributors data: ${response.statusText}`;
      
      if (response.status === 404) {
        errorMessage = "Contributors data file not found. Please run the data generation script.";
        console.error("Contributors JSON file is missing. Run 'node scripts/generate-contrib-data.js' to create it.");
      } else if (response.status >= 500) {
        errorMessage = "Server error while loading contributors data. Please try again later.";
      }
      
      throw new Error(errorMessage);
    }
    
    // Parse the JSON response
    const contributors = await response.json();
    
    // Validate contributors data
    if (!Array.isArray(contributors)) {
      console.warn("Contributors data has unexpected format - expected an array");
      return { 
        metadata, 
        contributors: [] 
      };
    }
    
    return { 
      metadata, 
      contributors 
    };
  } catch (error) {
    console.error("Error loading contributors data:", error.message);
    
    // Return empty contributors array on error to prevent page failures
    return { 
      metadata, 
      contributors: [],
      error: error.message
    };
  }
};
