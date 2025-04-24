import { donate } from "$lib/config";

let content = {
  props: {
    projects: donate.projects,
  },
};

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  try {
    const response = await fetch("/data/hubspot.json");
    const hubspotData = await response.json();

    // Create a map of project names to their deals and totals
    const projectDonations = {};

    // Initialize donation totals for each project
    content.props.projects.forEach((project) => {
      projectDonations[project.slug] = {
        deals: [],
        total: 0,
      };
    });

    // Create a mapping of common terms in deal names to project slugs
    const dealNameToSlugMap = {
      "spyder": ["spyder"],
      "code-completions": ["code completion", "smarter code"],
      "new-viewer-pane": ["viewer pane", "new viewer"],
      "syntax-highlighting": ["syntax highlight", "syntax-highlight"],
      "variable-explorer-improvements": ["variable explorer", "level-up the variable"]
    };

    // Sort deals into their respective projects
    hubspotData.pipelineDeals.forEach((deal) => {
      const dealNameLower = deal.properties.dealname.toLowerCase();
      
      // Check each project for potential matches
      content.props.projects.forEach((project) => {
        const possibleMatches = dealNameToSlugMap[project.slug] || [project.slug.replace(/-/g, ' ')];
        
        // Check if any of the possible matches are in the deal name
        const isMatch = possibleMatches.some(match => dealNameLower.includes(match.toLowerCase()));
        
        if (isMatch) {
          projectDonations[project.slug].deals.push(deal);
          projectDonations[project.slug].total +=
            parseFloat(deal.properties.amount) || 0;
        }
      });
    });

    // Add donation data to each project
    const projectsWithDonations = content.props.projects.map((project) => ({
      ...project,
      donations: {
        total: (projectDonations[project.slug].total + (project.pastDonations || 0)),
        deals: projectDonations[project.slug].deals,
        progress: project.donationGoal
          ? parseFloat((((projectDonations[project.slug].total + (project.pastDonations || 0)) / project.donationGoal) * 100).toFixed(2))
          : null,
      },
    }));

    return {
      props: {
        ...content.props,
        projects: projectsWithDonations,
      },
      totalDonations: hubspotData.totalDonations,
      pipelineDeals: hubspotData.pipelineDeals,
      monthlyDeals: hubspotData.monthlyDeals,
      oneTimeDeals: hubspotData.oneTimeDeals,
      lastUpdated: hubspotData.lastUpdated,
    };
  } catch (err) {
    console.error("Error loading HubSpot data:", err);
    return {
      props: content.props,
      error: "Error loading donation data",
      totalDonations: 0,
      pipelineDeals: [],
      monthlyDeals: [],
      oneTimeDeals: [],
      lastUpdated: null,
    };
  }
}

export const prerender = true;
