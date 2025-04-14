import { donate } from "$lib/config";
import { error } from "@sveltejs/kit";

export const prerender = true;

// Generate entries for prerendering
export function entries() {
  // Get all project slugs from the config
  return donate.projects.map((project) => ({
    slug: project.slug.toLowerCase(),
  }));
}

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
  const { slug } = params;

  // Find the project that matches the slug
  const project = [...donate.projects].find((p) =>
    p.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!project) {
    throw error(404, "Project not found");
  }

  try {
    const response = await fetch("/data/hubspot.json");
    const hubspotData = await response.json();

    // Find donations for this specific project
    const projectDonations = {
      deals: [],
      total: 0,
      monthly: 0,
      oneTime: 0,
    };

    // Get deals for this project
    hubspotData.pipelineDeals.forEach((deal) => {
      // Replace hyphens with spaces for comparison
      const projectNameForComparison = project.slug.toLowerCase().replace(/-/g, ' ');
      if (
        deal.properties.dealname.toLowerCase().includes(
          projectNameForComparison
        )
      ) {
        projectDonations.deals.push(deal);
        const amount = parseFloat(deal.properties.amount) || 0;
        projectDonations.total += amount;

        // Separate monthly and one-time donations
        if (deal.properties.dealname.toLowerCase().includes("monthly")) {
          projectDonations.monthly += amount;
        } else {
          projectDonations.oneTime += amount;
        }
      }
    });

    // Return project data with donations
    return {
      project: {
        ...project,
        donations: {
          total: projectDonations.total + (project.pastDonations || 0),
          monthly: projectDonations.monthly,
          oneTime: projectDonations.oneTime + (project.pastDonations || 0),
          deals: projectDonations.deals,
          progress: project.donationGoal
            ? parseFloat(
              (((projectDonations.total + (project.pastDonations || 0)) / project.donationGoal) * 100)
                .toFixed(1),
            )
            : null,
        },
      },
      lastUpdated: hubspotData.lastUpdated,
    };
  } catch (err) {
    console.error("Error loading HubSpot data:", err);
    return {
      project: {
        ...project,
        donations: {
          total: 0,
          monthly: 0,
          oneTime: 0,
          deals: [],
          progress: 0,
        },
      },
      lastUpdated: null,
    };
  }
}
