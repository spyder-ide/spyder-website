export const load = async ({ fetch }) => {
  const metadata = {
    title: "Spyder IDE | About",
    subtitle: "Who we are",
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
    // Fetch the pre-generated contributors data
    const response = await fetch("/data/github-contributors.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch contributors data: ${response.status}`);
    }
    const data = await response.json();
    return { metadata, contributors: data.contributors };
  } catch (error) {
    console.error("Error loading contributors data:", error);
    return { metadata, contributors: [] };
  }
};
