import { donate } from "$lib/config";
import { error } from "@sveltejs/kit";
import { loadYamlSafely } from "$lib/utils/yaml";
import rawDonateI18n from "$lib/i18n/en-US/donate.yaml?raw";

export const prerender = true;

// Generate entries for prerendering
export function entries() {
    // Get all project slugs from the config
    return donate.projects.map(project => ({
        slug: project.term.toLowerCase()
    }));
}

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
  const { slug } = params;
  const donateI18n = loadYamlSafely(rawDonateI18n, "donate");

  // Find the project that matches the slug
  const project = [...donate.projects].find((p) => p.term.toLowerCase() === slug.toLowerCase());

  if (!project) {
    throw error(404, "Project not found");
  }

  // Find the i18n data for this project
  const projectI18n = donateI18n.projects.find(p => p.id === project.id);

  if (!projectI18n) {
    throw error(404, "Project translations not found");
  }

  try {
    const response = await fetch("/data/hubspot.json");
    const hubspotData = await response.json();

    // Find donations for this specific project
    const projectDonations = {
      deals: [],
      total: 0,
      monthly: 0,
      oneTime: 0
    };

    // Get deals for this project
    hubspotData.pipelineDeals.forEach((deal) => {
      if (deal.properties.dealname.includes(project.term)) {
        projectDonations.deals.push(deal);
        const amount = parseFloat(deal.properties.amount) || 0;
        projectDonations.total += amount;

        // Separate monthly and one-time donations
        if (deal.properties.dealname.toLowerCase().includes('monthly')) {
          projectDonations.monthly += amount;
        } else {
          projectDonations.oneTime += amount;
        }
      }
    });

    // Merge project data with i18n data and donations
    const projectWithData = {
      ...project,
      ...projectI18n,
      donations: {
        total: projectDonations.total,
        monthly: projectDonations.monthly,
        oneTime: projectDonations.oneTime,
        deals: projectDonations.deals,
        progress: project.donationGoal
          ? parseFloat(((projectDonations.total / project.donationGoal) * 100).toFixed(2))
          : null,
      },
    };

    return {
      project: projectWithData,
      lastUpdated: hubspotData.lastUpdated
    };
  } catch (err) {
    console.error("Error loading HubSpot data:", err);
    return {
      project: {
        ...project,
        ...projectI18n,
        donations: {
          total: 0,
          monthly: 0,
          oneTime: 0,
          deals: [],
          progress: 0
        }
      },
      lastUpdated: null
    };
  }
}