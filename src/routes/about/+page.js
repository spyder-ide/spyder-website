import yaml from 'js-yaml';
import content from './content.yaml?raw';

const processContributors = (current, past, all) => {
  // Update current/past contributors from GitHub with custom data
  const updateContributor = (contributor, allContributors) => {
    const match = allContributors.find((c) => c.id === contributor.id);
    return match ? { ...match, ...contributor } : contributor;
  };

  const updatedCurrent = current.map((contributor) => updateContributor(contributor, all));
  const updatedPast = past.map((contributor) => updateContributor(contributor, all));

  // Get the remaining contributors that are not in the current/past lists
  const remainingContributors = all.filter(
    (contributor) =>
      !current.some((c) => c.id === contributor.id) &&
      !past.some((p) => p.id === contributor.id)
  );

  const totalContributorsPool = [...updatedCurrent, ...updatedPast];
  const totalContributors = totalContributorsPool.length;

  return {
    updatedCurrent,
    updatedPast,
    remainingContributors,
    totalContributors,
  };
};

export async function load({ fetch }) {
  const { dataSrc, currentContributors, pastContributors, textData } = yaml.load(content);

  try {
    // Fetch the contributors data
    const contributors = [];

    for (let n = 1; n <= 3; n++) {
      const response = await fetch(`${dataSrc}&page=${n}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      contributors.push(...data);
    }

    // Process the contributors and get the updated current contributors,
    // past contributors, and remaining contributors
    const {
      updatedCurrent,
      updatedPast,
      remainingContributors,
      totalContributors,
    } = processContributors(
      currentContributors,
      pastContributors,
      contributors
    );

    return {
      currentContributors: updatedCurrent,
      pastContributors: updatedPast,
      remainingContributors,
      textData,
      totalContributors,
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch contributors:", error);
    return {
      currentContributors,
      pastContributors,
      remainingContributors: [],
      textData,
      error: error.message,
    };
  }
}
