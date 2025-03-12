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
      throw new Error(`Failed to load contributors data: ${response.statusText}`);
    }
    
    // Parse the JSON response
    const contributors = await response.json();
    
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
